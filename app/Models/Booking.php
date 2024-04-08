<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

protected $fillable = ['name', 'status', 'start_time', 'end_time'];

public function getNameAttribute($value)
{
    return ucfirst($value);
}

public function getStatusAttribute($value)
{
    return ucfirst($value);
}

public function getStartTimeAttribute($value)
{
    return date('H:i', strtotime($value));
}

public function getEndTimeAttribute($value)
{
    return date('H:i', strtotime($value));
}

public function setNameAttribute($value)
{
    $this->attributes['name'] = strtolower($value);
}

public function setStatusAttribute($value)
{
    $this->attributes['status'] = strtolower($value);
}

public function setStartTimeAttribute($value)
{
    $this->attributes['start_time'] = date('H:i:s', strtotime($value));
}

public function setEndTimeAttribute($value)
{
    $this->attributes['end_time'] = date('H:i:s', strtotime($value));
}
public function isTimeAvailable($startTime, $endTime)
{
    $existingBookings = self::where(function ($query) use ($startTime, $endTime) {
        $query->where(function ($query) use ($startTime, $endTime) {
            $query->where('start_time', '<=', $startTime)
                ->where('end_time', '>=', $startTime);
        })->orWhere(function ($query) use ($startTime, $endTime) {
            $query->where('start_time', '<=', $endTime)
                ->where('end_time', '>=', $endTime);
        })->orWhere(function ($query) use ($startTime, $endTime) {
            $query->where('start_time', '>=', $startTime)
                ->where('end_time', '<=', $endTime);
        });
    })->count();

    return $existingBookings === 0;
}
}