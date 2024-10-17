<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->segment(1); 

        if (in_array($locale, config('app.available_locales'))) {
            App::setLocale($locale);
            URL::defaults(['locale' => $locale ?? config('app.locale')]);
        } 
        else {
            return redirect()->to('/' . config('app.locale') . '/' . $request->path());
        }

        return $next($request);
    }
}
