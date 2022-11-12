<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $materials = Material::all();

        return response()->json([
            'data' => $materials,
            'success' => 1,
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
            'title' => 'required|string|max:111',
            'price' => 'required|integer',
            'unit' => 'required|string|max:55',
            'description' => 'nullable|string',
        ]);

        $material = new Material();
        $material->title = $request['title'];
        $material->price = $request['price'];
        $material->unit = $request['unit'];
        $material->description = $request['description'];

        try{
            $material->save();
        }catch (\Exception $e){
            $this->saveToLog($e);
            return response()->json([
                'success' => 1,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'success' => 1,
            'savedId' => $material->id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\material  $material
     * @return \Illuminate\Http\Response
     */
    public function show(material $material)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\material  $material
     * @return \Illuminate\Http\Response
     */
    public function edit(material $material)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\material  $material
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, material $material)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\material  $material
     * @return \Illuminate\Http\Response
     */
    public function destroy(material $material)
    {
        try{
            $material->delete();
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
