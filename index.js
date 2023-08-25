import openai from "./config/open-ai.js"
import readlineSync from 'readline-sync'
import colors from 'colors'

async function main() {
    console.log(colors.bold.blue('Welcome to the Chatbot AI!'))
    console.log(colors.bold.blue('You can start Chatting with the bot'))

    const chatHistory = [] // Store conversation history

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '))

        try {
            const messages = chatHistory.map(([role, content]) => ({ role, content }))

            //Add latest user input
            messages.push({ role: 'user', content: userInput })

            //Calling the API wit the user input
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            })

            // Get completion text/content
            const completionText = completion.data.choices[0].message.content

            if(userInput.toLowerCase() === 'exit') {
            console.log(colors.green('Bot: ') + completionText)
                return
            }

            console.log(colors.green('Bot: ') + completionText)

            //Update History
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', completionText])

        } catch(error) {
            console.error(colors.red(error))
        }
    }

}

main()

export default openai