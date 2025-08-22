import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, isLoading, onAttachment }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage({
        type: 'text',
        content: message.trim(),
        timestamp: new Date()
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Simulate voice recording - in real app, implement actual recording
      setTimeout(() => {
        stopRecording();
        setMessage("This is a voice message converted to text using speech-to-text.");
      }, 3000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAttachment({
        type: 'attachment',
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        content: URL.createObjectURL(file),
        timestamp: new Date()
      });
    }
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-surface border-t border-border">
      {/* Quick Actions */}
      <div className="flex items-center space-x-2 mb-3 overflow-x-auto pb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMessage("Explain this concept in simple terms")}
          iconName="HelpCircle"
          iconPosition="left"
          iconSize={14}
          className="whitespace-nowrap"
        >
          Explain concept
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMessage("Give me practice problems")}
          iconName="Target"
          iconPosition="left"
          iconSize={14}
          className="whitespace-nowrap"
        >
          Practice problems
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMessage("Summarize the last lesson")}
          iconName="FileText"
          iconPosition="left"
          iconSize={14}
          className="whitespace-nowrap"
        >
          Summarize lesson
        </Button>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center space-x-2 mb-3 p-2 bg-error bg-opacity-10 rounded-lg">
          <div className="w-2 h-2 bg-error rounded-full pulse-gentle" />
          <span className="text-sm text-error font-medium">
            Recording... {formatRecordingTime(recordingTime)}
          </span>
          <Button
            variant="ghost"
            size="xs"
            onClick={stopRecording}
            iconName="Square"
            iconSize={12}
          >
            Stop
          </Button>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="w-full min-h-[44px] max-h-32 px-4 py-3 pr-12 bg-input border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-ring text-text-primary placeholder:text-text-secondary"
              disabled={isLoading || isRecording}
              rows={1}
              style={{ 
                height: 'auto',
                minHeight: '44px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
            
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-2 bottom-2 w-8 h-8"
              disabled={isLoading}
            >
              <Icon name="Paperclip" size={16} />
            </Button>
          </div>
        </div>

        {/* Voice Input Button */}
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
          className="w-11 h-11 rounded-full"
        >
          <Icon name={isRecording ? "Square" : "Mic"} size={20} />
        </Button>

        {/* Send Button */}
        <Button
          variant="default"
          size="icon"
          onClick={handleSend}
          disabled={!message.trim() || isLoading || isRecording}
          loading={isLoading}
          className="w-11 h-11 rounded-full"
        >
          <Icon name="Send" size={20} />
        </Button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ChatInput;