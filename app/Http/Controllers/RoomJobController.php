<?php

namespace App\Http\Controllers;

use App\Models\RoomJob;
use Illuminate\Http\Request;

class RoomJobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roomJobs = RoomJob::all();

        return response()->json($roomJobs);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rj = new RoomJob();
        $rj->room_id = $request['room_id'];
        $rj->title = $request['title'];
        $rj->main_info = $request['main_info'];
        $rj->sum = $request['sum'];

        try{
            $saved = $rj->save();
        }catch (\Exception $e){
            $this->saveToLog($e);

            return response()->json([
                'success' => 1,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'success' => 1,
            'savedId' => $rj->id,
            'saved' => $saved,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RoomJob  $roomJob
     * @return \Illuminate\Http\Response
     */
    public function show(RoomJob $roomJob)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RoomJob  $roomJob
     * @return \Illuminate\Http\Response
     */
    public function edit(RoomJob $roomJob)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RoomJob  $roomJob
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RoomJob $roomJob)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RoomJob  $roomJob
     * @return \Illuminate\Http\Response
     */
    public function destroy(RoomJob $roomjob)
    {
        try{
            $roomjob->delete();
        }catch (\Exception $e){
            $this->saveToLog($e);
            return response()->json([
                'success' => 1,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'success' => 1,
        ]);
    }

    protected function saveToLog($e){
        logger('error with ' . __METHOD__ . ' '
            . implode(' | ', [
                $e->getMessage(), $e->getLine(), $e->getCode(), $e->getFile()
            ])
        );
    }
}
