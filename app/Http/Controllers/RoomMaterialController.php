<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\RoomMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomMaterialController extends Controller
{
    public function index()
    {
        try{
            $roomMaterials = RoomMaterial::
                  join('rooms', 'room_id', 'rooms.id')
                ->join('materials', 'room_materials.material_id', 'materials.id')
                ->select('room_materials.*', 'materials.title')
                ->where('rooms.user_id', Auth::user()->id)
                ->orderBy('materials.id', 'desc')
                ->get();
        }catch (\Exception $e){
            $this->saveToLog($e);
            return response()->json([
                'success' => 0,
                'error' => 'some error!'
            ]);
        }

        return response()
            ->json([
                'success' => 1,
                'data'    => $roomMaterials,
            ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'room_id'     => 'required|integer',
            'material_id' => 'required|integer',
            'amount'      => 'required|integer',
            'sum'         => 'required|integer',
        ]);

        $r = new RoomMaterial();
        $r->room_id     = $request['room_id'];
        $r->material_id = $request['material_id'];
        $r->amount      = $request['amount'];
        $r->sum         = $request['sum'];

        try{
            $saved = $r->save();

            // now get title for
            $title = Material::where('id', $r->material_id)->get()->first()->title;
        }catch (\Exception $e){
            $this->saveToLog($e);

            return response()->json([
                'success' => 0,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'success' => 1,
            'savedId' => $r->id,
            'saved' => $saved,
            'title' => $title,
        ]);
    }

    public function show(RoomMaterial $roomMaterial)
    {
        //
    }

    public function edit(RoomMaterial $roomMaterial)
    {
        //
    }

    public function update(Request $request, RoomMaterial $roomMaterial)
    {
        //
    }

    public function destroy(RoomMaterial $roommaterial)
    {
        try{
            $roommaterial->delete();
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
