'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Container from '../ui/Container';

const testimonials = [
	{
		id: 1,
		name: 'Rajesh Kumar',
		location: 'Mumbai',
		rating: 5,
		text: 'City Holidays made our Golden Triangle tour absolutely perfect! The attention to detail and professional service exceeded our expectations.',
		image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
	},
	{
		id: 2,
		name: 'Priya Sharma',
		location: 'Delhi',
		rating: 5,
		text: 'Excellent service and well-planned itinerary. Our family trip to Rajasthan was memorable thanks to their expert guidance.',
		image: 'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=100&h=100&fit=crop&crop=face',
	},
	{
		id: 3,
		name: 'Amit Patel',
		location: 'Bangalore',
		rating: 5,
		text: 'Professional taxi service and comfortable vehicles. Highly recommend for outstation travel. Great value for money!',
		image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
	},
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[number] }> = ({ testimonial }) => {
	return (
		<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative group hover:shadow-xl transition-all duration-300">
			{/* Quote Icon */}
			<div className="absolute -top-4 left-8">
				<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
					<Quote className="h-4 w-4 text-white" />
				</div>
			</div>

			{/* Stars */}
			<div className="flex items-center gap-1 mb-4 pt-2">
				{[...Array(testimonial.rating)].map((_, i) => (
					<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
				))}
			</div>

			{/* Testimonial Text */}
			<p className="text-gray-700 leading-relaxed mb-6 font-medium">
				"{testimonial.text}"
			</p>

			{/* Customer Info */}
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
					<img
						src={testimonial.image}
						alt={testimonial.name}
						className="w-full h-full object-cover"
					/>
				</div>
				<div>
					<h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
					<p className="text-sm text-gray-500">{testimonial.location}</p>
				</div>
			</div>
		</div>
	);
};

const Testimonials: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const nextSlide = () => {
		setActiveIndex((prev) => (prev + 1) % (testimonials.length - 2));
	};

	const prevSlide = () => {
		setActiveIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
	};

	return (
		<section className="py-20 bg-gradient-to-b from-gray-50 to-white">
			<Container>
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
						<Star className="h-4 w-4" />
						Customer Reviews
					</div>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						What Our&nbsp;
						<span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
							Customers Say
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Read genuine reviews from our satisfied customers who have experienced
						our exceptional travel services and hospitality.
					</p>
				</div>

				{/* Testimonials Grid */}
				<div className="grid lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial) => (
						<div key={testimonial.id} className="flex-none w-[85%] snap-center">
							<TestimonialCard testimonial={testimonial} />
						</div>
					))}
				</div>

				{/* Trust Indicators */}
				<div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div className="group">
							<div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
								1000+
							</div>
							<div className="text-gray-600 font-medium">Happy Customers</div>
						</div>
						<div className="group">
							<div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">
								4.8/5
							</div>
							<div className="text-gray-600 font-medium">Average Rating</div>
						</div>
						<div className="group">
							<div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
								500+
							</div>
							<div className="text-gray-600 font-medium">Tours Completed</div>
						</div>
						<div className="group">
							<div className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform">
								24/7
							</div>
							<div className="text-gray-600 font-medium">Support Available</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Testimonials;