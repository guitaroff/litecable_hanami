module Web
  class Chat < Channel
    identifier :chat

    def subscribed
      #reject unless chat_id
      #stream_from "chat_#{chat_id}"
      stream_from "chat_1"
    end

    def speak(data)
      Hanami::Logger.new.info "#{@user} CONNECTED"
      #LiteCable.broadcast "chat_#{chat_id}", user: user, message: data["message"], sid: sid
      LiteCable.broadcast "chat_1", message: data["message"]
    end

    private

    def chat_id
      @chat_id ||= params.fetch("id")
    end
  end
end
