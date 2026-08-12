<?php

namespace App\Services;

use App\Enums\ProjectPriority;
use App\Enums\ProjectStatus;
use App\Models\Project;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules\Enum;

class ProjectService
{
    public function createProject(array $data)
    {
        $validated = $this->validateProject($data);

        DB::beginTransaction();

        try {
            $project = new Project([
                'client_name' => $validated['client_name'],
                'project_name' => $validated['project_name'],
                'description' => $validated['description'] ?? null,
                'status' => $validated['status'],
                'priority' => $validated['priority'],
                'start_date' => $validated['start_date'],
                'due_date' => $validated['due_date'],
            ]);

            $project->save();

            DB::commit();

            return $project;
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    public function updateProject(Project $project, array $data)
    {
        $validated = $this->validateProject($data);

        DB::beginTransaction();

        try {
            $project->update([
                'client_name' => $validated['client_name'],
                'project_name' => $validated['project_name'],
                'description' => $validated['description'] ?? null,
                'status' => $validated['status'],
                'priority' => $validated['priority'],
                'start_date' => $validated['start_date'],
                'due_date' => $validated['due_date'],
            ]);

            DB::commit();

            return $project->fresh();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    private function validateProject(array $data): array
    {
        return Validator::make($data, [
            'client_name' => [
                'required',
                'string',
            ],
            'project_name' => [
                'required',
                'string',
                'max:191',
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'status' => [
                'required',
                new Enum(ProjectStatus::class),
            ],
            'priority' => [
                'required',
                new Enum(ProjectPriority::class),
            ],
            'start_date' => [
                'required',
                'date',
            ],
            'due_date' => [
                'required',
                'date',
                'after_or_equal:start_date',
            ],
        ], [
            'client_name.required' => 'Client name is required.',
            'client_name.string' => 'Client name must be a valid text value.',

            'project_name.required' => 'Project name is required.',
            'project_name.string' => 'Project name must be a valid text value.',
            'project_name.max' => 'Project name cannot exceed 191 characters.',

            'description.string' => 'Description must be a valid text value.',

            'status.required' => 'Project status is required.',
            'status.enum' => 'Invalid project status. Please select Planning, In Progress, On Hold, or Completed.',

            'priority.required' => 'Project priority is required.',
            'priority.enum' => 'Invalid project priority. Please select Low, Medium, or High.',

            'start_date.required' => 'Start date is required.',
            'start_date.date' => 'Start date must be a valid date.',

            'due_date.required' => 'Due date is required.',
            'due_date.date' => 'Due date must be a valid date.',
            'due_date.after_or_equal' => 'Due date cannot be earlier than the start date.',
        ])->validate();
    }
}
