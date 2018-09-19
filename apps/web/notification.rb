module Web
  class Notification < Channel
    identifier :notification

    def subscribed
      reject unless notification_id
      stream_from "notification_#{notification_id}"
    end

    def speak(data)
      Hanami::Logger.new.info "#{@user} connected"
      LiteCable.broadcast "notification_#{notification_id}", user: user, message: data["message"], sid: sid
    end

    private

    def notification_id
      @notification_id ||= params.fetch("id")
    end
  end
end
