class EditoriumController < ActionController::Base
  def show
    @data = params[:editorium]
    render layout: Editorium.try(:configuration).preview_layout
  end
end
