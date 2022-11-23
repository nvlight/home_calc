<?php

namespace App\Http\Controllers;

use App\Models\RoomJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomJobController extends Controller
{
    public function index()
    {
        try{
            $roomJobs = RoomJob::
                  join('rooms', 'room_jobs.room_id', 'rooms.id')
                ->where('rooms.user_id', Auth::user()->id)
                ->orderBy('room_jobs.id', 'desc')
                ->get();
        }catch (\Exception $e){
            $this->saveToLog($e);
            return response()->json([
                'success' => 1,
                'error' => 'some error!'
            ]);
        }

        return response()->json($roomJobs);
    }

    public function create()
    {
        //
    }

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

    public function show(RoomJob $roomJob)
    {

    }

    public function edit(RoomJob $roomJob)
    {
        //
    }

    public function update(Request $request, RoomJob $roomJob)
    {
        //
    }

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
