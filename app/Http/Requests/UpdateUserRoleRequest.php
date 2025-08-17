<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:user_roles,name,' . $this->route('user_role')->id,
            'description' => 'nullable|string|max:500',
            'priority' => 'required|integer|min:0|max:100',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Role name is required.',
            'name.unique' => 'This role name already exists.',
            'priority.required' => 'Priority is required.',
            'priority.integer' => 'Priority must be a number.',
            'priority.min' => 'Priority must be at least 0.',
            'priority.max' => 'Priority cannot exceed 100.',
        ];
    }
}