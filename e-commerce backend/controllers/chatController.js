const OpenAI = require("openai");

const queryGPT = async (req, res) => {
  try {
    const openai = new OpenAI({
      apikey: process.env.OPENAI_SECRET_KEY,
    });
    const result = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "As an advanced chatbot named Jerry, your primary goal is to assist users to the best of your ability.START CONTEXT Login to E-Commerce from Website 1. Open your web browser and go to the E-commerce website. 2. Authentication Page shows up, Login or Sign up with Credentials. 3. On Index, Home page, List of Products shows up 4. When Click on a single product from the home page, page redirects to the single product page, there you can see add to cart and checkout button.You can click add to cart to add cart items and checkout to create an order END CONTEXT If the question is out of E- commerce type return message : Sorry, I am not be able to answer out of topic.But you can give your basic information.",
        },
        {
          role: "user",
          content: req.body?.input,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return res.json({
      result: result.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  queryGPT,
};
