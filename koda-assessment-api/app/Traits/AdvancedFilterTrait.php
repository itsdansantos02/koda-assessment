<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

trait AdvancedFilterTrait
{
    /**
     * This function will read the advFilter query string on request url
     * advFilter contain a key and value
     * The key is the column in the database table. For special case, the key can be a relation column.
     * The format of the relation column is "relationTable.relationColumn". Please note the dot.
     *
     * The value is an object that can contain operator, function, and value. Can choose to use operator or function
     * The operator is a Mysql Comparison Operators
     * The value for function can be one of these: date, time, day, month, year. This will be converted into Laravel query builder
     * Example of using:
     * http://localhost:8000/api/some-module?advFilter={"reason": {"operator": "<>", "value": ""}, "time_in": {"function": "month", "value": "04"}}
     * Example of using contain relation:
     * http://localhost:8000/api/students?advFilter={"schedules.schedule_id": {"operator": "=", "value": "01gy9d4rhw1j2v2nwrcmnnmzr7"}}
     */
    public function advancedFilter(Builder &$builder, $model, $data)
    {
        $columns = $model::getTableColumns();
        $customFilter = Arr::get($data, 'advFilter', []);

        $customFilters = is_string($customFilter) ? json_decode($customFilter, true) : $customFilter;
        foreach ($customFilters as $customFilterColumn => $customFilterValue) {
            $delimiter = '.';
            if (strpos($customFilterColumn, $delimiter) !== false) {
                $explodeFilterColumn = explode($delimiter, $customFilterColumn);
                $relationColumn = array_pop($explodeFilterColumn);
                $relationTable = implode($delimiter, $explodeFilterColumn);
                $builder->whereHas($relationTable, function ($query) use ($relationColumn, $customFilterValue) {
                    if ($customFilterValue['operator'] === 'in') {
                        $query->whereIn($relationColumn, explode(',', $customFilterValue['value']));
                    } elseif ($customFilterValue['operator'] === 'search-name') {
                        $query->where('name', 'like', '%'.$customFilterValue['value'].'%');
                    } elseif ($customFilterValue['operator'] === 'date-range') {
                        $values = explode(',', $customFilterValue['value']);
                        $start_date = $values[0];
                        $end_date = $values[1];
                        $query->where(function ($query) use ($start_date, $end_date) {
                            $query->whereBetween('start_date', [$start_date, $end_date])
                                ->orWhereBetween('end_date', [$start_date, $end_date]);
                        });
                    } elseif ($customFilterValue['operator'] === 'between') {
                        $values = explode(',', $customFilterValue['value']);
                        $query->whereBetween($relationColumn, $values);
                    } else {
                        $query->where($relationColumn, $customFilterValue['operator'], $customFilterValue['value']);
                    }
                });
            } else {
                if (array_search($customFilterColumn, $columns) !== false) {
                    if (! empty($customFilterValue['function'])) {
                        switch ($customFilterValue['function']) {
                            case 'date':
                                $builder->whereDate($customFilterColumn, $customFilterValue['value']);
                                break;

                            case 'time':
                                $builder->whereTime($customFilterColumn, $customFilterValue['value']);
                                break;

                            case 'day':
                                $builder->whereDay($customFilterColumn, $customFilterValue['value']);
                                break;

                            case 'month':
                                $builder->whereMonth($customFilterColumn, $customFilterValue['value']);
                                break;

                            case 'year':
                                $builder->whereYear($customFilterColumn, $customFilterValue['value']);
                                break;

                            case 'in':
                                // the value is comma separated, e.g 1,3,7,9
                                $values = explode(',', $customFilterValue['value']);
                                $builder->whereIn($customFilterColumn, $values);
                                break;

                            case 'where-null':
                                $builder->where(function ($query) use ($customFilterColumn, $customFilterValue) {
                                    $query->orWhere($customFilterColumn, $customFilterValue['value'])
                                        ->orWhereNull($customFilterColumn);
                                });
                                break;

                            case 'between':
                                // the value is comma separated, e.g 1,5
                                // can be a date also, e.g 2023-01-01,2023-01-31
                                $values = explode(',', $customFilterValue['value']);
                                $builder->whereBetween($customFilterColumn, $values);
                                break;

                            case 'in-array':
                                $values = explode(',', $customFilterValue['value']);
                                $builder->where(function ($query) use ($values, $customFilterColumn) {
                                    foreach ($values as $value) {
                                        $query->orWhereJsonContains($customFilterColumn, $value);
                                    }
                                });
                                break;

                            case 'like':
                                $builder->whereRaw("`$customFilterColumn` like ?", ['%'.$customFilterValue['value'].'%']);
                                break;

                            case 'like-in':
                                $values = explode(',', $customFilterValue['value']);
                                $builder->where(function ($query) use ($values, $customFilterColumn) {
                                    foreach ($values as $value) {
                                        $query->orWhereRaw("$customFilterColumn like ?", ['%'.$value.'%']);
                                    }
                                });
                                break;

                            default:
                                $builder;
                                break;
                        }
                    } else {
                        // otherwise, filter normally based on the table's columns
                        $builder->where($customFilterColumn, $customFilterValue['operator'], $customFilterValue['value']);
                    }
                }
            }
        }

        if (method_exists($model, 'getSearchableSpecial')) {
            $searchColumns = array_merge($model::getSearchable(), $model::getSearchableSpecial());
        } else {
            $searchColumns = $model::getSearchable();
        }
        $search = Arr::get($data, 'advSearch');
        if ($search && $search != '') {
            if (count($searchColumns) == 1) {
                $builder->whereRaw($searchColumns[0].' like ?', ["%$search%"]);
            }

            if (count($searchColumns) > 1) {
                $builder->where(function ($query) use ($searchColumns, $search) {
                    foreach ($searchColumns as $index => $searchField) {
                        if ($index == 0) {
                            $query->where($searchField, 'like', '%'.$search.'%');
                        } else {
                            $query->orWhereRaw($searchField.' like ?', ["%$search%"]);
                        }
                    }
                });
            }
        }
    }
}
