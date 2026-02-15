import './About.css';

const About = () => {
    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="section-title">
                    <h2>About Me</h2>
                </div>

                <div className="about-content">
                    <div className="about-image animate-slide-left">
                        <div className="about-image-wrapper glass-card">
                            <img
                                src="/images/profile.png"
                                alt="Rahul Lohra"
                                className="profile-image"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
                            />
                        </div>
                    </div>

                    <div className="about-text animate-slide-right">
                        <h3 className="gradient-text">Passionate Developer & Creative Problem Solver</h3>
                        <p>
                            I'm an AI and Full Stack Engineer building intelligent, performant,
                            and data-driven web applications. With expertise in ML integration, I bring
                            complex ideas to life through clean code and innovative architecture.
                        </p>
                        <p>
                            My journey in tech evolved from building web interfaces to architecting
                            neural systems. Today, I've had the privilege of developing diverse tools,
                            from predictive models to full-scale AI platforms, always focusing on
                            delivering exceptional, high-impact user experiences.
                        </p>
                        <p>
                            When I'm not coding, you can find me researching LLMs, contributing
                            to open-source AI, or exploring the latest in Kaggle and ML research.
                        </p>

                        <div className="about-stats">
                            <div className="stat-item glass-card">
                                <h4 className="gradient-text">10+</h4>
                                <p>Projects Completed</p>
                            </div>
                            <div className="stat-item glass-card">
                                <h4 className="gradient-text">1+</h4>
                                <p>Years Experience</p>
                            </div>
                            <div className="stat-item glass-card">
                                <h4 className="gradient-text">10+</h4>
                                <p>Happy Clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
