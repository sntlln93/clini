<?php

namespace App\Enums;

enum AppointmentStatus
{
    case Canceled;
    case Done;
    case Missed;
    case Pending;
}
