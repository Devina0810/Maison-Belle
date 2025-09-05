import { useEffect, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { sendMessage as sendAIMessage } from "../services/geminiService";

const categories = [
	{ href: "/dresses", name: "Dresses", imageUrl: "/dress.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2019/11/ig_fw19_suit_6.jpg" },
	{ href: "/jeans", name: "Jeans", imageUrl: "/Arox jean.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/blue.jpg" },
	{ href: "/purses", name: "Purses", imageUrl: "/purse.jpg" },
	{ href: "/watches", name: "Watches", imageUrl: "/watch9.jpg" },
	{ href: "/t-shirts", name: "Tees", imageUrl: "/tee.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [chatMessages, setChatMessages] = useState([
		{ text: "Hello! I'm Stylo, your fashion advisor at Maison Belle! 🛍️✨ How can I help you find the perfect style today?", isBot: true }
	]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	const sendMessage = async () => {
		if (currentMessage.trim()) {
			// Add user message
			const userMessage = currentMessage.trim();
			setChatMessages(prev => [...prev, { text: userMessage, isBot: false }]);
			setCurrentMessage("");
			setIsTyping(true);
			
			try {
				// Get real AI response from Gemini
				const aiResponse = await sendAIMessage(userMessage);
				
				// Add AI response
				setChatMessages(prev => [...prev, { 
					text: aiResponse, 
					isBot: true 
				}]);
			} catch (error) {
				console.error("Error getting AI response:", error);
				// Enhanced fallback response
				setChatMessages(prev => [...prev, { 
					text: "I apologize, but I'm having trouble connecting to my fashion brain right now! � Please try asking your question again, or let me know what specific styling help you need! �", 
					isBot: true 
				}]);
			} finally {
				setIsTyping(false);
			}
		}
	};

	return (
		<div className='relative min-h-screen bg-[#f5f0e8] text-[#5e412f] font-[Cormorant Garamond] overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-semibold text-[#5e412f] mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-[#7b6650] mb-12'>
					Discover the latest trends in timeless fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && (
					<div className="mt-16">
						<FeaturedProducts featuredProducts={products} />
					</div>
				)}
			</div>

			{/* AI Chatbot Widget */}
			<div className="fixed bottom-4 right-4 z-50">
				{/* Chat Window */}
				{isChatOpen && (
					<div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-xl border border-[#e9ded2] flex flex-col">
						{/* Chat Header */}
						<div className="bg-[#5e412f] text-white p-4 rounded-t-lg flex justify-between items-center">
							<div className="flex items-center space-x-2">
								<MessageCircle className="h-5 w-5" />
								<span className="font-medium">Stylo - Fashion Advisor</span>
							</div>
							<button 
								onClick={() => setIsChatOpen(false)}
								className="text-white hover:text-gray-300 transition-colors"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Chat Messages */}
						<div className="flex-1 p-4 overflow-y-auto space-y-3">
							{chatMessages.map((message, index) => (
								<div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
									<div className={`max-w-xs p-3 rounded-lg ${
										message.isBot 
											? 'bg-[#f5f0e8] text-[#5e412f] border border-[#e9ded2]' 
											: 'bg-[#5e412f] text-white'
									}`}>
										<p className="text-sm">{message.text}</p>
									</div>
								</div>
							))}
							
							{/* Typing Indicator */}
							{isTyping && (
								<div className="flex justify-start">
									<div className="bg-[#f5f0e8] text-[#5e412f] border border-[#e9ded2] p-3 rounded-lg max-w-xs">
										<div className="flex space-x-1">
											<div className="w-2 h-2 bg-[#5e412f] rounded-full animate-bounce"></div>
											<div className="w-2 h-2 bg-[#5e412f] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
											<div className="w-2 h-2 bg-[#5e412f] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Chat Input */}
						<div className="p-4 border-t border-[#e9ded2]">
							<div className="flex space-x-2">
								<input
									type="text"
									value={currentMessage}
									onChange={(e) => setCurrentMessage(e.target.value)}
									onKeyPress={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
									placeholder={isTyping ? "Stylo is typing..." : "Ask me about fashion, styling, or our products..."}
									disabled={isTyping}
									className="flex-1 px-3 py-2 border border-[#e9ded2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e412f] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
								/>
								<button
									onClick={sendMessage}
									disabled={isTyping || !currentMessage.trim()}
									className="bg-[#5e412f] text-white p-2 rounded-lg hover:bg-[#4a331f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<Send className="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Chat Toggle Button */}
				<button
					onClick={() => setIsChatOpen(!isChatOpen)}
					className="bg-[#5e412f] text-white p-4 rounded-full shadow-lg hover:bg-[#4a331f] transition-colors"
				>
					<MessageCircle className="h-6 w-6" />
				</button>
			</div>
		</div>
	);
};

export default HomePage;
