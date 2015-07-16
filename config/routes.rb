Editorium::Rails::Engine.routes.draw do
  post "/render" => "editorium#show", as: 'editorium_preview'
end
