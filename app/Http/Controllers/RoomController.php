<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    public function index()
    {
        try{
            $rooms = Room::
                  where('user_id', Auth::user()->id)
                ->get();
        }catch (\Exception $e){
            $this->saveToLog($e);
            return response()->json([
                'success' => 0,
                'error' => 'some error!'
            ]);
        }

        return json_encode([
            'rooms' => $rooms,
            'success' => 1,
            //'user' => Auth::user(),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(StoreRoomRequest $request)
    {
        $room = new Room();
        $statement = DB::select("show table status like '{$room->getTable()}'");
        if ($statement){
            // узнаю каким будет следущий автоинкремент ИД !
            $nextId = $statement[0]->Auto_increment;

            try{
                $r = ($request->all());
                $r['id'] = $nextId;
                $room->data = json_encode($r);
                $room->user_id = Auth::user()->id;
                $saved = $room->save();
            }catch (\Exception $e){
                $this->saveToLog($e);
                $rs = ['success' => 0, 'message' => 'error'];
                die(json_encode($rs));
            }

            return response()->json([
                'success' => 1,
                'saved' => $saved,
                'room_id' => $nextId,
                //'savedRoomIdAgain!' => $room->id,
            ]);
        }
        return response()->json([
            'success' => 0,
            'error' => 'some error!'
        ]);
    }

    public function show(Room $room)
    {
        //
    }


    public function edit(Room $room)
    {
        //
    }

    public function update(UpdateRoomRequest $request, Room $room)
    {
        try{
            $r = ($request->all());
            $room->data = json_encode($r);
            $room->user_id = Auth::user()->id;
            $room->title = $r['title'];
            $saved = $room->save();
        }catch (\Exception $e){
            $this->saveToLog($e);
            return response()->json([
                'success' => 1,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'success' => 1,
            'saved' => $saved,
            'room_id' => $room->id,
        ]);
    }

    public function destroy(Room $room)
    {
        $room->delete();

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
