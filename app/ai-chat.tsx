import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Sparkles, ArrowDown } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { roleThemes, spacing, typography, radii } from '../src/design-system/tokens';
import { useTheme } from '../src/design-system/theme';
import { aiChatHistory } from '../src/data/fixtures';
import { PrimaryButton } from '../src/design-system/components';

type Msg = { id: string; from: 'me' | 'ai'; text: string };

const suggestions = [
  'When should I take my next dose?',
  'What does my last lab result mean?',
  'Should I worry about my BP trend?',
];

const sampleReplies: Record<string, string> = {
  default:
    'I am here to help. I can summarize your record, explain medications, or remind you about appointments. Always check with your doctor for anything urgent.',
  dose: 'Your next Metformin dose is at 8:00 PM with dinner. I can set a reminder if you want.',
  lab:
    'Your last CBC is within normal range. Hemoglobin 13.4 g/dL, WBC 7.2 - all good. Your HbA1c improved from 7.6 to 7.1 - keep going.',
  bp: 'Your last 5 readings averaged 128/82, which is in the high-normal range. Cutting salt and walking 20 min/day usually helps.',
};

const replyFor = (q: string): string => {
  const lower = q.toLowerCase();
  if (/dose|tablet|medication|metformin/.test(lower)) return sampleReplies.dose;
  if (/lab|result|cbc|hba1c|sugar/.test(lower)) return sampleReplies.lab;
  if (/bp|pressure|blood pressure/.test(lower)) return sampleReplies.bp;
  return sampleReplies.default;
};

export default function AiChat() {
  const t = useTheme();
  const role = roleThemes.patient;
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([...aiChatHistory] as Msg[]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const myMsg: Msg = { id: `m-${Date.now()}`, from: 'me', text: content };
    setMessages((prev) => [...prev, myMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const ai: Msg = { id: `a-${Date.now()}`, from: 'ai', text: replyFor(content) };
      setMessages((prev) => [...prev, ai]);
      setIsTyping(false);
      requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
    }, 700);
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: t.bg }]} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <LinearGradient
          colors={[role.gradientFrom, role.gradientTo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <Sparkles color="#fff" size={20} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyBold, { color: '#fff' }]}>Health Assistant</Text>
            <Text style={[typography.caption, { color: 'rgba(255,255,255,0.85)' }]}>
              Always-on, guardrailed. Not a replacement for your doctor.
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((m) => (
            <View
              key={m.id}
              style={[
                styles.bubble,
                m.from === 'me'
                  ? { alignSelf: 'flex-end', backgroundColor: role.accent }
                  : { alignSelf: 'flex-start', backgroundColor: t.card, borderColor: t.border, borderWidth: StyleSheet.hairlineWidth },
              ]}
            >
              <Text
                style={[
                  typography.body,
                  { color: m.from === 'me' ? '#fff' : t.text },
                ]}
              >
                {m.text}
              </Text>
            </View>
          ))}
          {isTyping ? (
            <View style={[styles.bubble, { alignSelf: 'flex-start', backgroundColor: t.card, borderColor: t.border, borderWidth: StyleSheet.hairlineWidth }]}>
              <Text style={[typography.caption, { color: t.textMuted, fontStyle: 'italic' }]}>
                typing...
              </Text>
            </View>
          ) : null}
        </ScrollView>

        {messages.length < 4 ? (
          <View style={styles.suggestRow}>
            {suggestions.map((s) => (
              <Pressable
                key={s}
                onPress={() => send(s)}
                style={[styles.chip, { backgroundColor: role.softTint, borderColor: role.accent + '44' }]}
              >
                <Text style={[typography.caption, { color: role.accent, fontWeight: '600' }]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <View style={[styles.composer, { backgroundColor: t.card, borderTopColor: t.border }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask about meds, labs, vitals..."
            placeholderTextColor={t.textMuted}
            style={[typography.body, styles.input, { color: t.text }]}
            onSubmitEditing={() => send()}
            returnKeyType="send"
          />
          <Pressable
            onPress={() => send()}
            disabled={!input.trim()}
            style={[styles.sendBtn, { backgroundColor: input.trim() ? role.accent : t.border }]}
          >
            <Send color="#fff" size={18} />
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
          <PrimaryButton
            label="Close"
            variant="outline"
            accent={role.accent}
            icon={<ArrowDown size={16} color={role.accent} />}
            onPress={() => router.back()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    margin: spacing.lg,
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.lg,
  },
  suggestRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: { flex: 1, padding: 0, paddingVertical: 8 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
