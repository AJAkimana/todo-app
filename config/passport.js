import passportLocal from 'passport-local';
import { User } from '../models';
import { unHashPassword, hashPassword } from '../helpers';

const LocalStrategy = passportLocal.Strategy;

const userDb = new User();
/**
 *
 * @param {Object} passport Passport package
 */
export const localPassport = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		const user = userDb.findOne('id', id);
		done(null, user);
	});
	//____________________Local login_________________//
	passport.use(
		'local.login',
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true
			},
			(req, username, password, done) => {
				username = username.toLowerCase().trim();
				userDb
					.findOne('username', username)
					.then((user) => {
						if (!user) return done({ message: 'Invalid user info' });
						if (!unHashPassword(password, user.password))
							return done({ message: 'Invalid password' });
						return done(null, user);
					})
					.catch((error) => done(error));
			}
		)
	);
	/**
	 * Sign up using Phone and Password.  New Account
	 */
	passport.use(
		'local.signup',
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true
			},
			(req, username, password, done) => {
				let { names } = req.body;

				password = hashPassword(password);
				username = username.toLowerCase().trim();
				names = names.trim();

				userDb
					.findOne('username', username)
					.then((userExist) => {
						if (userExist) {
							return done({
								message: 'Username has taken'
							});
						}
						userDb
							.create({ names, username, password })
							.then((newUser) => {
								done(null, newUser);
							})
							.catch((error) => done(error));
					})
					.catch((error) => done(error));
			}
		)
	);
};
