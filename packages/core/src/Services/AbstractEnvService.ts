abstract class AbstractEnvService {
	abstract getAll(): Record<string, string | undefined>;
}

export default AbstractEnvService;
