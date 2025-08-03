import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#ffffff] dark:bg-[#232b3b] rounded-xl p-8 md:p-12 border border-[#e2e8f0] dark:border-[#334155]">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-extrabold text-[#1a2332] dark:text-[#e2e8f0]">Privacy Policy</h1>
                    <p className="text-sm text-[#667085] dark:text-[#94a3b8]">
                        Last Updated: {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>

                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to HackForge ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website and services (collectively, the "Service"). By using the Service, you agree to the collection and use of information in accordance with this policy.
                    </p>

                    <h2>2. Information We Collect</h2>
                    <p>We collect information that you provide directly to us, information we collect automatically when you use our Service, and information from third-party sources.</p>

                    <h3>Information You Provide to Us</h3>
                    <ul>
                        <li><strong>Account Information:</strong> When you register for an account, we collect your name, email address, and password (which is hashed). If you register using a third-party service like Google or GitHub, we collect information provided by that service, such as your name, email, and public profile information.</li>
                        <li><strong>Profile Information:</strong> You may choose to provide additional information for your user profile, such as a profile picture.</li>
                        <li><strong>User Content:</strong> We collect the content you create and upload to the Service. This includes your code submissions, comments, notes on submissions, and problems you add to custom "sprints."</li>
                        <li><strong>AI Tutor Communications:</strong> When you interact with our AI Tutor, we collect the queries and code snippets you provide to the service to facilitate responses.</li>
                        <li><strong>Communications:</strong> If you contact us directly, we may receive additional information about you, such as your name, email address, the contents of the message, and/or attachments you may send us.</li>
                    </ul>

                    <h3>Information We Collect Automatically</h3>
                    <ul>
                        <li><strong>Log and Usage Data:</strong> Our servers automatically record information when you use the Service, including your IP address, browser type, operating system, pages visited, access times, and referring website addresses. We also track your activity on the platform, such as problems solved and submission history, to provide you with daily and yearly activity statistics.</li>
                        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
                    </ul>

                    <h2>3. How We Use Your Information</h2>
                    <p>We use the information we collect for various purposes, including to:</p>
                    <ul>
                        <li>Provide, operate, and maintain our Service.</li>
                        <li>Create and manage your account, including processing payments for premium services via our third-party payment processor (Razorpay).</li>
                        <li>Execute your code securely using our third-party code execution engine (Judge0).</li>
                        <li>Provide AI-powered guidance and analysis through our integration with the Google GenAI SDK.</li>
                        <li>Improve, personalize, and expand our Service.</li>
                        <li>Understand and analyze how you use our Service for analytics and to improve user experience.</li>
                        <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes.</li>
                        <li>Enhance the security of our Service.</li>
                    </ul>

                    <h2>4. How We Share Your Information</h2>
                    <p>We do not sell your personal information. We may share information we have collected about you in certain situations:</p>
                    <ul>
                        <li><strong>Third-Party Service Providers:</strong> We share information with third-party vendors and service providers that perform services on our behalf, such as code execution (Judge0), AI services (Google), media storage (Cloudinary), payment processing (Razorpay), and email delivery (Nodemailer). These providers only have access to the information necessary to perform their functions.</li>
                        <li><strong>Publicly Shared Information:</strong> Your username and certain activity, such as your rank on the leaderboard or any public sprints you create, may be visible to other users of the Service.</li>
                        <li><strong>Advertising Partners:</strong> We may share information with third-party advertising partners to show you ads that might interest you. This is further detailed in the "Advertising and Analytics" section below.</li>
                        <li><strong>Legal Obligations:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
                    </ul>

                    <h2>5. Advertising and Analytics</h2>
                    <p>To support and enhance our Service, we may use third-party advertising services like Google AdSense. These services help us provide many of our features for free.</p>
                    <ul>
                        <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.</li>
                        <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
                        <li>
                            You may opt out of personalized advertising by visiting Google's{' '}
                            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#f97316]">
                                Ads Settings
                            </a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
                            <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#f97316]">
                                www.aboutads.info/choices
                            </a>.
                        </li>
                    </ul>

                    <h2>6. Your Data Rights and Choices</h2>
                    <p>Depending on your location, you may have certain rights regarding your personal information. These rights may include:</p>
                    <ul>
                        <li><strong>Access:</strong> You have the right to access your personal data through your profile page.</li>
                        <li><strong>Correction:</strong> You can update or correct inaccuracies in your information through your account settings.</li>
                        <li><strong>Deletion:</strong> You may request the deletion of your account and associated personal data by contacting us. Please note that we may need to retain certain information for legal or administrative purposes.</li>
                        <li><strong>Opt-Out of Communications:</strong> You may opt out of receiving promotional emails from us by following the unsubscribe link included in such emails.</li>
                    </ul>

                    <h2>7. Data Security</h2>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. We use bcrypt for hashing passwords and JWT for securing sessions. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

                    <h2>8. Children's Privacy</h2>
                    <p>Our Service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you become aware that a child has provided us with Personal Information, please contact us.</p>

                    <h2>9. Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

                    <h2>10. Contact Us</h2>
                    <p>
                        If you have any questions or comments about this Privacy Policy, please contact us at:{' '}
                        <a href="mailto:contact@hackforge.dev" className="text-[#f97316]">
                            contact@hackforge.dev
                        </a>.
                    </p>
                </article>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;