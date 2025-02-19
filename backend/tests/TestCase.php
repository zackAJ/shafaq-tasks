<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Str;
use Illuminate\Testing\TestResponse;

abstract class TestCase extends BaseTestCase
{
    /*
    * Wrapper for testing api call
    */
    protected function apiCall(string $method, $uri, array $data = [], array $headers = [], $options = 0, string $version = 'v1'): TestResponse
    {

        $args = array_slice(func_get_args(), 0, 5); // remove $version arg

        if (Str::startsWith($uri, '/')) {
            $uri = Str::substr($uri, 1);
        }

        $args[1] = "api/$version/$uri";

        return $this->json(...$args);
    }
}
