<?php
namespace App\Http\Controllers;
use DB;
use App\Http\Controllers\Controller;
class projectManagerController extends Controller
{
	public function index() {
		return '{}';
	}
	public function listLevel() {
		return json_encode(DB::table('users')->get());
        //return view('project.levels', ['users' => $users]);
    }
	
	public function listUser() {
		return json_encode(DB::table('users')->get());
    }
	
	public function listTask() {
		return json_encode(DB::table('tasks')->get());
    }
}