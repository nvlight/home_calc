<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
{
    public function index()
    {
        try{
            $materials = Material::
                              orderBy('id', 'desc')
                            ->get();
        }catch (\Exception $e){
            $this->saveToLog($e);
            return response()->json([
                'success' => 0,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'data' => $materials,
            'success' => 1,
        ]);
    }

    public function create()
    {
        //
    }

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
                'success' => 0,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'success' => 1,
            'savedId' => $material->id,
        ]);
    }

    public function show(material $material)
    {
        //
    }

    public function edit(material $material)
    {
        //
    }

    public function update(Request $request, material $material)
    {
        $this->validate($request, [
            'title' => 'required|string|max:111',
            'price' => 'required|integer',
            'unit' => 'required|string|max:55',
            'description' => 'nullable|string',
        ]);

        $material->title = $request['title'];
        $material->price = $request['price'];
        $material->unit = $request['unit'];
        $material->description = $request['description'];

        try{
            $material->save();
        }catch (\Exception $e){
            $this->saveToLog($e);
            return response()->json([
                'success' => 0,
                'error' => 'some error!'
            ]);
        }

        return response()->json([
            'success' => 1,
            'updatedId' => $material->id,
        ]);
    }

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
