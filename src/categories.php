<?php

class Categories extends Controller{
    
    protected $file = 'categories.json';

    public function get(){
       
    }
            
    public function add(){
        $data = json_decode(trim(stripslashes(file_get_contents('php://input')), '\"'), true);
        if (!empty($data['category'])){
            $category = trim($data['category']);
            $categories = $this->loadContent();
            $id = $this->getFirstAvailableId($categories);
            $categories[] = array(
                'name' => $category,
                'id' => $id
            );
            $categories = $this->sort($categories);
            $this->saveData($categories);
        } else {
            throw new Exception('Category name should not be empty.');
        }
    }
    
    public function edit(){
        $data = json_decode(trim(stripslashes(file_get_contents('php://input')), '\"'), true);
        if (!empty($data)){
            $data = $this->sort($data);
            $this->saveData($data);
        }
    }
    
    public function delete(){
        
    }
    
    private function sort($data)
    {
        usort($data, function($first, $second){
            return $first['name'] > $second['name'];
        });
        
        return $data;
    }
    
    private function getFirstAvailableId($categories)
    {
        $ids = array_column($categories, 'id');
        $ids = array_combine($ids, $ids);
        $firstAvailableId = 1;
        do{
            if (!isset($ids[$firstAvailableId])){
                return $firstAvailableId;
            }
            $firstAvailableId++;
        } while(true);
    }
}