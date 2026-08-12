<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;
use App\Traits\AdvancedFilterTrait;
use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Builder;
use Taksu\Restful\Controllers\CrudController;
use Taksu\Restful\Traits\ModelCommonTrait;
use Exception;
use App\Services\ProjectService;
use Illuminate\Support\Arr;

class ProjectController extends CrudController
{
    use AdvancedFilterTrait, HttpResponse;

    public function __construct(protected ProjectService $service)
    {
        parent::__construct(Project::class, ProjectResource::class);
    }

    protected function filterAll(Builder &$builder, $model, $data): void
    {
        parent::filterAll($builder, $model, $data);

        $this->advancedFilter($builder, $model, $data);
    }

    public function index(Request $request)
    {
        try {
            $data = $request->all();

            $model = $this->model::query()->with($this->relations);
            $columns = $this->model::getTableColumns();
            $traits = class_uses($this->model);

            // apply filter and custom filter
            $this->filterAll($model, $this->model, $request);

            // Check columns for current table
            $sort = Arr::get($data, 'sort', 'created_at');
            if (!in_array($sort, $columns)) {
                $sort = 'created_at';
            }

            $order = Arr::get($data, 'order', 'desc');
            if (array_key_exists(ModelCommonTrait::class, $traits)) {
                $model->orderBy($sort, strtolower($order));
            }

            // Finally, paginate and return
            $limit = Arr::get($data, 'limit', 20);
            $paginated = $model->paginate($limit);

            if ($this->resourceClass) {
                return $this->resourceClass::collection($paginated);
            }

            return $paginated;
        } catch (Exception $e) {
            return response()->json(['message' => 'Get academic year failed', 'detail' => $e->getMessage()], 400);
        }
    }

    public function show($id)
    {
        $model = $this->model::findOrFail($id);
        return $this->resource($model);
    }

    public function store(Request $request)
    {
        try {
            $project = $this->service->createProject($request->all());

            return response()->json(['message' => 'Create Project success', 'data' => $this->resource($project)], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Create Project failed', 'detail' => $e->getMessage()], 400);
        }
    }


    public function update(Request $request, $id)
    {
        try {
            $project = Project::findOrFail($id);
            $project = $this->service->updateproject($project, $request->all());

            return response()->json(['message' => 'Update Project success', 'data' => $this->resource($project)], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Update Project failed', 'detail' => $e->getMessage()], 400);
        }
    }

    public function destroy($id)
    {
        try {
            $document = Project::findOrFail($id);
            $document->delete();

            return response()->json(['message' => 'Project deleted successfully.'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Project not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Cannot delete project.', 'detail' => $e->getMessage()], 400);
        }
    }
}
