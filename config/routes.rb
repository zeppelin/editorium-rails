Editorium::Rails::Engine.routes.draw do
  post "/render" => "editorium#show", as: 'preview'
end
