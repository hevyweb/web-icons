<?php

class Icons extends Controller {
    
    protected $file = 'icons.json';
    
    
    
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

    public function delete() {
        $data = json_decode(trim(stripslashes(file_get_contents('php://input')), '\"'), true);
        $icon = intval($data['code']);
        $icons = $this->loadContent();
        $browser = get_browser(null, true);
        if (!count($browser)){
            throw new Exception('Your PHP is not configured to use get_browser. For more information - https://stackoverflow.com/questions/2036956/browscap-ini-directive-not-set.');
        }
        $icons[0][$icon] = array(
            'html' => '&#' . $icon . ';',
            'browser' => $browser['browser'],
            'version' => $browser['version'],
            'os' => $browser['platform']
        );
        $this->saveData($icons);
    }

}