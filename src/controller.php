<?php

abstract class Controller{
    abstract public function get();
            
    abstract public function add();
    
    abstract public function edit();
    
    abstract public function delete();
    
    protected function saveData($data){
        $file = realpath(__DIR__ . '/../data/' . $this->file);
        file_put_contents($file, json_encode($data));
    }    
        
    /**
     * Loads list of categories
     * 
     * @return array
     * @throws Exception
     */
    protected function loadContent(){
        $file = realpath(__DIR__ . '/../data/' . $this->file);
        if (is_file($file)){
            $jsonString = file_get_contents($file);        
            $content = json_decode($jsonString, true);
            if (is_null($content)){
                throw new Exception('Can not load categories. Data file is damaged.');
            }
            return $content;
        } else {
            throw new Exception('Can not load categories. Data file does not exist.');
        }
    }
}