<?php

class Categories implements Controller{
    private $file = 'categories.json';
    
    /**
     * Loads list of categories
     * 
     * @return array
     * @throws Exception
     */
    private function loadContent(){
        $file = __DIR__ . '/../data' . $this->file;
        if (!is_file($file)){
            $jsonString = file_get_contents($folder);        
            $content = json_decode($jsonString, true);
            if (is_null($content)){
                throw new Exception('Can not load categories. Data file is damaged.');
            }
            return $content;
        } else {
            throw new Exception('Can not load categories. Data file does not exist.');
        }
    }
    
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