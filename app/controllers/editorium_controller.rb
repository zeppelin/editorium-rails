class EditoriumController < ActionController::Base
  def show
    @data = params[:editorium]
    render layout: false
  end
end
