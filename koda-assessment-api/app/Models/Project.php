<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Taksu\Restful\Traits\ModelCommonTrait;

class Project extends Model
{
    use HasUlids, SoftDeletes, ModelCommonTrait;

    protected $fillable = [
        'client_name',
        'project_name',
        'description',
        'status',
        'priority',
        'start_date',
        'due_date',
    ];

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'due_date' => 'date:Y-m-d',
    ];

    protected $keyType = 'string';
}
