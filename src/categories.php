<?php

class Categories implements Controller{
    public function get(){
        
    }
            
    public function add(){
        $category = $_POST['category'];
    }
    
    public function edit(){
        $this->add();
    }
    
    public function delete(){
        $category = $_POST['category'];
    }
}