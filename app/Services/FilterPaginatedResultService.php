<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @template T of \Illuminate\Database\Eloquent\Model
 */
class FilterPaginatedResultService
{
    /**
     * @var array<string>
     */
    private array $searchable_columns;

    /**
     * @param  \Illuminate\Database\Eloquent\Builder<T>  $builder
     */
    public function __construct(private Builder $builder)
    {
    }

    /**
     * @param  array<string>  $searchable_columns
     * @return FilterPaginatedResultService<T>
     */
    public function setSearchableColumns(array $searchable_columns): FilterPaginatedResultService
    {
        $this->searchable_columns = $searchable_columns;

        return $this;
    }

    /**
     * @param  array<string,string>  $filters
     * @return LengthAwarePaginator<T>
     */
    public function apply(array $filters): LengthAwarePaginator
    {
        if (array_key_exists('filter', $filters) && isset($this->searchable_columns)) {
            $this->builder->where(function ($q) use ($filters) {
                foreach ($this->searchable_columns as $column) {
                    $q->orWhere($column, 'LIKE', '%'.$filters['filter'].'%');
                }

                return $q;
            });
        }

        if (array_key_exists('sort_column', $filters) && array_key_exists('sort_order', $filters)) {
            $this->builder->orderBy($filters['sort_column'], $filters['sort_order']);
        }

        $per_page = array_key_exists('per_page', $filters)
            ? (int) $filters['per_page']
            : 10;

        $page = array_key_exists('page', $filters)
            ? (int) $filters['page']
            : 1;

        return $this->builder->paginate($per_page);
    }
}
