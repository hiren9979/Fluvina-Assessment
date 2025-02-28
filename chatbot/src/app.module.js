
const { Module } = require('@nestjs/common');
const { ConfigModule } = require('@nestjs/config');
const { ChatbotModule } = require('./chatbot/chatbot.module');

const configValidationSchema = {
  validationSchema: {
    OPENAI_API_KEY: {
      required: true,
    },
    REDIS_URL: {
      required: true,
    },
  }
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    ChatbotModule,
  ],
})
class AppModule {}

module.exports = { AppModule };
