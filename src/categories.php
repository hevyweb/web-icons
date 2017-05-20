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
    
    private function saveData($data){
        $file = realpath(__DIR__ . '/../data/' . $this->file);
        file_put_contents($file, json_encode($data));
    }


    public function get(){
       
    }
            
    public function add(){
        if (!empty($_POST['category'])){
            $category = trim($_POST['category']);
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