import { View, Text, Pressable } from "react-native";
import React from "react";
import { Chat } from "@/types";
import { Image } from "expo-image";
import { formatDistanceToNow, isValid } from "date-fns";

const ChatItem = ({ chat, onPress }: { chat: Chat; onPress: () => void }) => {
  const participant = chat.participant;

  // TODO: To be updated later
  const isOnline = true;
  const isTyping = false;
  const hasUnread = false;

  return (
    <Pressable
      className="flex-row items-center py-3 active:opacity-70"
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Chat with ${participant.name}`}
    >
      {/* Avatar image */}
      <View className="relative">
        <Image
          source={participant.avatar}
          style={{ width: 56, height: 56, borderRadius: 999 }}
        />
        {isOnline && (
          <View className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-[3px] border-surface"></View>
        )}
      </View>

      {/* Chat Info */}
      <View className="flex-1 ml-4">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-base font-medium ${hasUnread ? "text-primary" : "text-foreground"}`}
          >
            {participant.name}
          </Text>

          <View className="flex-row items-center gap-2">
            {hasUnread && (
              <View className="w-2.5 h-2.5 bg-primary rounded-full" />
            )}
            <Text className="text-xs text-subtle-foreground">
              {(() => {
                if (!chat.lastMessageAt) return "";
                const date = new Date(chat.lastMessageAt);
                return isValid(date)
                  ? formatDistanceToNow(date, { addSuffix: false })
                  : "";
              })()}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-1">
          {isTyping ? (
            <Text className="text-sm text-primary italic">typing...</Text>
          ) : (
            <Text
              className={`text-sm flex-1 mr-1 ${hasUnread ? "text-foreground font-bold" : "text-subtle-foreground"}`}
              numberOfLines={1}
            >
              {chat.lastMessage?.text || "No Messages"}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;
