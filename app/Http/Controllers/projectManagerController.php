<?php
namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class projectManagerController extends Controller
{
	public function index() {
		return '{}';
	}
	
	public function getItem($obj, $id) {
		return json_encode(array('obj'=>$obj,'id'=>$id));
	}
	
	public function getList($list) {
		if (method_exists($this, $list)){
			return call_user_func_array(array($this, $list), array());
		}
		return '{}';
		//	return call_user_func_array(array($this, $action), array($param));
	}
	
	// Get
	public function users() {
		return json_encode(DB::table('user')->get());
    }
	public function levels() {
		return json_encode(DB::table('level')->get());
    }
	public function tasks() {
		return json_encode(DB::table('task')->get());
    }
	
	//project-manager/item/user/new
	public function adduser() {
		DB::beginTransaction();
		try {
			DB::table('user')->insert(
				[
				'username' => 'johna@example.com',
				'password' => 'aj hoge',
				'firstname' => 'fname',
				'lastname' => 'lname'
				]
			);
			DB::commit();
			return json_encode(array('status'=>1));
		} catch (\Exception $e) {
			DB::rollback();
			return json_encode(array('status'=>0));
		}
	}
	public function updateuser() {
		DB::beginTransaction();
		try {
			DB::table('user')
				->where(['username' => 'johna@example.com'])
				->update(
				[
				'password' => 'aj hoge',
				'firstname' => 'fname',
				'lastname' => 'lname'
				]
			);
			DB::commit();
			return json_encode(array('status'=>1));
		} catch (\Exception $e) {
			DB::rollback();
			return json_encode(array('status'=>0));
		}
	}
	public function deleteuser(Request $request) {
		$username = $request->input('username');
		//return json_encode(array('username'=>$username));
		DB::beginTransaction();
		try {
			DB::table('user')
				->where(['username' => $username])
				->delete();
			DB::commit();
			return json_encode(array('status'=>1));
		} catch (\Exception $e) {
			DB::rollback();
			return json_encode(array('status'=>0));
		}
	}
}