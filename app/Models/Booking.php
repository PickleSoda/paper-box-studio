<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

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

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtolower($value);
    }

    public function setStatusAttribute($value)
    {
        $this->attributes['status'] = strtolower($value);
    }
    /**
     * Set the start time attribute.
     *
     * @param  string  $value
     * @return void
     */
    public function setStartTimeAttribute($value)
    {
        $this->attributes['start_time'] = Carbon::createFromFormat('d-m-Y H:i', $value)->format('Y-m-d H:i:s');
    }

    /**
     * Set the end time attribute.
     *
     * @param  string  $value
     * @return void
     */
    public function setEndTimeAttribute($value)
    {
        $this->attributes['end_time'] = Carbon::createFromFormat('d-m-Y H:i', $value)->format('Y-m-d H:i:s');
    }
    public function isTimeAvailable($startTime, $endTime)
    {
        $overlapStarts = self::where('start_time', '<=', $startTime)->where('end_time', '>', $startTime)->exists();
        $overlapEnds = self::where('start_time', '<', $endTime)->where('end_time', '>=', $endTime)->exists();
        $completelyWithin = self::where('start_time', '>=', $startTime)->where('end_time', '<=', $endTime)->exists();
        $surrounds = self::where('start_time', '<=', $startTime)->where('end_time', '>=', $endTime)->exists();
        
        return !($overlapStarts || $overlapEnds || $completelyWithin || $surrounds);
    }
    
    
}