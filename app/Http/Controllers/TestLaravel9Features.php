<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestLaravel9Features extends Controller
{
    public function str()
    {
        return view('testLaravel9Features.test_str_class');
    }

    public function dd(Request $request)
    {
        $chich = ['result' => 'rsss', 'success' => 1];
        dd($chich);

        return view('welcome', compact('chich'));
    }
}
