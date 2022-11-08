<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rooms = Room::all();
        $lastId = Room::max('room_id');

        $roomsJson = json_encode($rooms);

        return json_encode([
            'rooms' => $rooms, 'lastId' => $lastId
        ]);
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
     * @param  \App\Http\Requests\StoreRoomRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRoomRequest $request)
    {
        $room = new Room();
        $statement = DB::select("show table status like '{$room->getTable()}'");
        if ($statement){
            // узнаю каким будет следущий автоинкремент ИД !
            $nextId = $statement[0]->Auto_increment;

            $room->room_id = $nextId;

            try{
                $r = ($request->all());
                $r['id'] = $nextId;
            }catch (\Exception $e){
                $this->saveToLog($e);
                $rs = ['success' => 0, 'message' => 'error'];
                die(json_encode($rs));
            }

            $room->data = json_encode($r);
            $saved = $room->save();

            return response()->json([
                'success' => 1,
                'saved' => $saved,
                'room_id' => $nextId,
            ]);
        }
        return response()->json([
            'success' => 1,
            'error' => 'some error!'
        ]);
    }

    public function store2()
    {
        $room = new Room;

        $room = Room::make([
            'room_id' => 500,
            'data' => json_encode(['sizes' => ['s1' => 0, 's2' => 0,'s3' => 0,'s4' => 0,], ]),
        ]);
        dump($room);
        dump($room->getTable());
        $statement = DB::select("show table status like '{$room->getTable()}'");
        if ($statement){
            $nextId = $statement[0]->Auto_increment;
            dump($statement);
            dump($nextId);
        }

        //$room->room_id = 333;
        //$room->data = json_encode(['sizes' => ['s1' => 0, 's2' => 0,'s3' => 0,'s4' => 0,], ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRoomRequest  $request
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
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
