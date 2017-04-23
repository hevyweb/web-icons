<?php

class Icons implements Controller {
    public function get(){
        
    }
    
    public function add(){
        $code = $_POST['code'];
        $keywords = $_POST['keywords'];
        $category = $_POST['category'];
        $fonts = $_POST['fonts'];
        var_dump($code, $keywords, $categoryId, $fonts);
    }
    
    public function edit(){
        $this->add();
    }
    
    public function delete(){
        $code = $_POST['code'];
        
    }
}