<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;
use Taksu\Restful\Controllers\CrudController;

class ProjectController extends CrudController
{

    public function __construct()
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
