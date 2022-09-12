@extends('layouts.testLaravel9Features.main_layout')

@section('content')
    <h3>Test str class</h3>
    <?php
        echo str('Rickardo! ')
            ->append('chichin')
            ->upper()->lower();
    ?>
@endsection
