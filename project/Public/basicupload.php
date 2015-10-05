<?php
date_default_timezone_set('Asia/Shanghai');
       //判断是否上传文件
       if(isset($_FILES['Filedata']) && $_FILES['Filedata']['size'] > 0){
           $file = $_FILES['Filedata']; 
           //$file = array('name' => 'aaaa.jpg', 'size' => 1111, 'tmp_name' => '/Users/changzheng/Downloads/T17ESxFXBXXXXXX.jpg');

           if($file['size'] > 2*1024*1024){
               return_msg(array('status' => 'error','msg'=> '上传文件大小超过2M!'));
           }

           $shop_id = isset($_REQUEST['shop_id'])&&!empty($_REQUEST['shop_id'])?trim($_REQUEST['shop_id']):uniqid();
           
           //$shop_id = '182400';

           $name = $file['name'];
           
           $name_array = explode('.', $name);

           $file_ext = $name_array[count($name_array) - 1];
           
           //$file_ext = end(explode('.', $name));

           if(!in_array(strtolower($file_ext), array('jpg','gif','png','bmp','jpeg'))){
              return_msg(array('status' => 'error', 'msg'=>'上传的文件格式不正确'));
           }

           //$name = $shop_id . '_' . uniqid() . '_' . $name;
           $name = $shop_id . '_' . uniqid() . '_' . time() . '.' . $file_ext;

           $upload_path = __DIR__ . '/upload/'.date('Ymd').'/';
           if(!is_dir($upload_path)){
               @mkdir($upload_path, 0755, true);
           }

           $tmp_name = $file['tmp_name'];
           $full_path = '/upload/'.date('Ymd').'/'.$name;
           move_uploaded_file($tmp_name, $upload_path.$name);
           //echo json_encode(array('status' => 'success', 'msg'=>$file_name, 'phones' => $phones));
           
           $return = array('status' => 'success', 'data'=> array('url' => $full_path));
           return_msg($return);
       }else{
           return_msg(array('status' => 'error','msg'=> '上传文件大小不能为零!'));
       }

function return_msg($msg = array()){
    header('Content-type: text/json;');
    echo json_encode($msg);
    exit(); 
}
