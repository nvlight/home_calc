<?php

namespace App\Http\Controllers;

use App\Models\RoomMaterial;
use Illuminate\Http\Request;

class RoomMaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roomMaterials = RoomMaterial::all();

        return response()
            ->json([
                'success' => 1,
                'data'    => $roomMaterials,
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
        }catch (\Exception $e){
            $this->saveToLog($e);

            return response()->json([
                'success' => 1,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'success' => 1,
            'savedId' => $r->id,
            'saved' => $saved,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RoomMaterial  $roomMaterial
     * @return \Illuminate\Http\Response
     */
    public function show(RoomMaterial $roomMaterial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RoomMaterial  $roomMaterial
     * @return \Illuminate\Http\Response
     */
    public function edit(RoomMaterial $roomMaterial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RoomMaterial  $roomMaterial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RoomMaterial $roomMaterial)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RoomMaterial  $roomMaterial
     * @return \Illuminate\Http\Response
     */
    public function destroy(RoomMaterial $roomMaterial)
    {
        try{
            $roomMaterial->delete();
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
