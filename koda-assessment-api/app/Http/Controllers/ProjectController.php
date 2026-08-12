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


    public function index(Request $request)
    {
        return null;
    }

    public function show($id)
    {
        return null;
    }

    public function store(Request $request)
    {
        return null;
    }


    public function update(Request $request, $id)
    {
        return null;
    }

    public function destroy($id)
    {
        return null;
    }
}
