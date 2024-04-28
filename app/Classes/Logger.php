<?php

declare(strict_types=1);

namespace App\Classes;

use Illuminate\Support\Facades\Log;

class Logger
{
    /**
     * System is unusable.
     *
     * @param  array<mixed>  $context
     */
    public static function emergency(string $message, array $context = []): void
    {
        Log::stack(['stderr', 'stack'])->emergency($message, $context);
    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param  array<mixed>  $context
     */
    public static function alert(string $message, array $context = []): void
    {

        Log::stack(['stderr', 'stack'])->alert($message, $context);
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param  array<mixed>  $context
     */
    public static function critical(string $message, array $context = []): void
    {

        Log::stack(['stderr', 'stack'])->critical($message, $context);
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param  array<mixed>  $context
     */
    public static function error(string $message, array $context = []): void
    {

        Log::stack(['stderr', 'stack'])->error($message, $context);
    }

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param  array<mixed>  $context
     */
    public static function warning(string $message, array $context = []): void
    {

        Log::stack(['stderr', 'stack'])->warning($message, $context);
    }

    /**
     * Normal but significant events.
     *
     * @param  array<mixed>  $context
     */
    public static function notice(string $message, array $context = []): void
    {

        Log::stack(['stderr', 'stack'])->notice($message, $context);
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param  array<mixed>  $context
     */
    public static function info(string $message, array $context = []): void
    {

        Log::stack(['stderr', 'stack'])->info($message, $context);
    }

    /**
     * Detailed debug information.
     *
     * @param  array<mixed>  $context
     */
    public static function debug(string $message, array $context = []): void
    {

        Log::stack(['stderr', 'stack'])->debug($message, $context);
    }
}
