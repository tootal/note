# VSCode的Task原理分析
顺带着分析一下VSCode的源代码。

## 根目录下配置文件

[EditorConfig](https://editorconfig.org/)

[.eslintignore](https://github.com/eslint/eslint)
Find and fix problems in your JavaScript code.

.gitattributes


## task相关代码
运行一个task的方法是在命令面板中输入task。

尝试搜索`tasks.json`文件。

这里注册了一部分变量：

```ts

function registerVariableCompletions(pattern: string): vscode.Disposable {
	return vscode.languages.registerCompletionItemProvider({ language: 'jsonc', pattern }, {
		provideCompletionItems(document, position, _token) {
			const location = getLocation(document.getText(), document.offsetAt(position));
			if (!location.isAtPropertyKey && location.previousNode && location.previousNode.type === 'string') {
				const indexOf$ = document.lineAt(position.line).text.indexOf('$');
				const startPosition = indexOf$ >= 0 ? new vscode.Position(position.line, indexOf$) : position;

				return [
					{ label: 'workspaceFolder', detail: localize('workspaceFolder', "The path of the folder opened in VS Code") },
					{ label: 'workspaceFolderBasename', detail: localize('workspaceFolderBasename', "The name of the folder opened in VS Code without any slashes (/)") },
					{ label: 'relativeFile', detail: localize('relativeFile', "The current opened file relative to ${workspaceFolder}") },
					{ label: 'relativeFileDirname', detail: localize('relativeFileDirname', "The current opened file's dirname relative to ${workspaceFolder}") },
					{ label: 'file', detail: localize('file', "The current opened file") },
					{ label: 'cwd', detail: localize('cwd', "The task runner's current working directory on startup") },
					{ label: 'lineNumber', detail: localize('lineNumber', "The current selected line number in the active file") },
					{ label: 'selectedText', detail: localize('selectedText', "The current selected text in the active file") },
					{ label: 'fileDirname', detail: localize('fileDirname', "The current opened file's dirname") },
					{ label: 'fileExtname', detail: localize('fileExtname', "The current opened file's extension") },
					{ label: 'fileBasename', detail: localize('fileBasename', "The current opened file's basename") },
					{ label: 'fileBasenameNoExtension', detail: localize('fileBasenameNoExtension', "The current opened file's basename with no file extension") },
					{ label: 'defaultBuildTask', detail: localize('defaultBuildTask', "The name of the default build task. If there is not a single default build task then a quick pick is shown to choose the build task.") },
				].map(variable => ({
					label: '${' + variable.label + '}',
					range: new vscode.Range(startPosition, position),
					detail: variable.detail
				}));
			}

			return [];
		}
	});
}

```

## task定义

```ts

/**
 * Controls the behaviour of the terminal's visibility.
 */
export enum TaskRevealKind {
	/**
	 * Always brings the terminal to front if the task is executed.
	 */
	Always = 1,

	/**
	 * Only brings the terminal to front if a problem is detected executing the task
	 * (e.g. the task couldn't be started because).
	 */
	Silent = 2,

	/**
	 * The terminal never comes to front when the task is executed.
	 */
	Never = 3
}

/**
 * Controls how the task channel is used between tasks
 */
export enum TaskPanelKind {

	/**
	 * Shares a panel with other tasks. This is the default.
	 */
	Shared = 1,

	/**
	 * Uses a dedicated panel for this tasks. The panel is not
	 * shared with other tasks.
	 */
	Dedicated = 2,

	/**
	 * Creates a new panel whenever this task is executed.
	 */
	New = 3
}

/**
 * Controls how the task is presented in the UI.
 */
export interface TaskPresentationOptions {
	/**
	 * Controls whether the task output is reveal in the user interface.
	 * Defaults to `RevealKind.Always`.
	 */
	reveal?: TaskRevealKind;

	/**
	 * Controls whether the command associated with the task is echoed
	 * in the user interface.
	 */
	echo?: boolean;

	/**
	 * Controls whether the panel showing the task output is taking focus.
	 */
	focus?: boolean;

	/**
	 * Controls if the task panel is used for this task only (dedicated),
	 * shared between tasks (shared) or if a new panel is created on
	 * every task execution (new). Defaults to `TaskInstanceKind.Shared`
	 */
	panel?: TaskPanelKind;

	/**
	 * Controls whether to show the "Terminal will be reused by tasks, press any key to close it" message.
	 */
	showReuseMessage?: boolean;

	/**
	 * Controls whether the terminal is cleared before executing the task.
	 */
	clear?: boolean;
}

/**
 * A grouping for tasks. The editor by default supports the
 * 'Clean', 'Build', 'RebuildAll' and 'Test' group.
 */
export class TaskGroup {

	/**
	 * The clean task group;
	 */
	static Clean: TaskGroup;

	/**
	 * The build task group;
	 */
	static Build: TaskGroup;

	/**
	 * The rebuild all task group;
	 */
	static Rebuild: TaskGroup;

	/**
	 * The test all task group;
	 */
	static Test: TaskGroup;

	private constructor(id: string, label: string);
}

/**
 * A structure that defines a task kind in the system.
 * The value must be JSON-stringifyable.
 */
export interface TaskDefinition {
	/**
	 * The task definition describing the task provided by an extension.
	 * Usually a task provider defines more properties to identify
	 * a task. They need to be defined in the package.json of the
	 * extension under the 'taskDefinitions' extension point. The npm
	 * task definition for example looks like this
	 * ```typescript
	 * interface NpmTaskDefinition extends TaskDefinition {
	 *     script: string;
	 * }
	 * ```
	 *
	 * Note that type identifier starting with a '$' are reserved for internal
	 * usages and shouldn't be used by extensions.
	 */
	readonly type: string;

	/**
	 * Additional attributes of a concrete task definition.
	 */
	[name: string]: any;
}

/**
 * Options for a process execution
 */
export interface ProcessExecutionOptions {
	/**
	 * The current working directory of the executed program or shell.
	 * If omitted the tools current workspace root is used.
	 */
	cwd?: string;

	/**
	 * The additional environment of the executed program or shell. If omitted
	 * the parent process' environment is used. If provided it is merged with
	 * the parent process' environment.
	 */
	env?: { [key: string]: string };
}

/**
 * The execution of a task happens as an external process
 * without shell interaction.
 */
export class ProcessExecution {

	/**
	 * Creates a process execution.
	 *
	 * @param process The process to start.
	 * @param options Optional options for the started process.
	 */
	constructor(process: string, options?: ProcessExecutionOptions);

	/**
	 * Creates a process execution.
	 *
	 * @param process The process to start.
	 * @param args Arguments to be passed to the process.
	 * @param options Optional options for the started process.
	 */
	constructor(process: string, args: string[], options?: ProcessExecutionOptions);

	/**
	 * The process to be executed.
	 */
	process: string;

	/**
	 * The arguments passed to the process. Defaults to an empty array.
	 */
	args: string[];

	/**
	 * The process options used when the process is executed.
	 * Defaults to undefined.
	 */
	options?: ProcessExecutionOptions;
}

/**
 * The shell quoting options.
 */
export interface ShellQuotingOptions {

	/**
	 * The character used to do character escaping. If a string is provided only spaces
	 * are escaped. If a `{ escapeChar, charsToEscape }` literal is provide all characters
	 * in `charsToEscape` are escaped using the `escapeChar`.
	 */
	escape?: string | {
		/**
		 * The escape character.
		 */
		escapeChar: string;
		/**
		 * The characters to escape.
		 */
		charsToEscape: string;
	};

	/**
	 * The character used for strong quoting. The string's length must be 1.
	 */
	strong?: string;

	/**
	 * The character used for weak quoting. The string's length must be 1.
	 */
	weak?: string;
}

/**
 * Options for a shell execution
 */
export interface ShellExecutionOptions {
	/**
	 * The shell executable.
	 */
	executable?: string;

	/**
	 * The arguments to be passed to the shell executable used to run the task. Most shells
	 * require special arguments to execute a command. For  example `bash` requires the `-c`
	 * argument to execute a command, `PowerShell` requires `-Command` and `cmd` requires both
	 * `/d` and `/c`.
	 */
	shellArgs?: string[];

	/**
	 * The shell quotes supported by this shell.
	 */
	shellQuoting?: ShellQuotingOptions;

	/**
	 * The current working directory of the executed shell.
	 * If omitted the tools current workspace root is used.
	 */
	cwd?: string;

	/**
	 * The additional environment of the executed shell. If omitted
	 * the parent process' environment is used. If provided it is merged with
	 * the parent process' environment.
	 */
	env?: { [key: string]: string };
}

/**
 * Defines how an argument should be quoted if it contains
 * spaces or unsupported characters.
 */
export enum ShellQuoting {

	/**
	 * Character escaping should be used. This for example
	 * uses \ on bash and ` on PowerShell.
	 */
	Escape = 1,

	/**
	 * Strong string quoting should be used. This for example
	 * uses " for Windows cmd and ' for bash and PowerShell.
	 * Strong quoting treats arguments as literal strings.
	 * Under PowerShell echo 'The value is $(2 * 3)' will
	 * print `The value is $(2 * 3)`
	 */
	Strong = 2,

	/**
	 * Weak string quoting should be used. This for example
	 * uses " for Windows cmd, bash and PowerShell. Weak quoting
	 * still performs some kind of evaluation inside the quoted
	 * string.  Under PowerShell echo "The value is $(2 * 3)"
	 * will print `The value is 6`
	 */
	Weak = 3
}

/**
 * A string that will be quoted depending on the used shell.
 */
export interface ShellQuotedString {
	/**
	 * The actual string value.
	 */
	value: string;

	/**
	 * The quoting style to use.
	 */
	quoting: ShellQuoting;
}

export class ShellExecution {
	/**
	 * Creates a shell execution with a full command line.
	 *
	 * @param commandLine The command line to execute.
	 * @param options Optional options for the started the shell.
	 */
	constructor(commandLine: string, options?: ShellExecutionOptions);

	/**
	 * Creates a shell execution with a command and arguments. For the real execution VS Code will
	 * construct a command line from the command and the arguments. This is subject to interpretation
	 * especially when it comes to quoting. If full control over the command line is needed please
	 * use the constructor that creates a `ShellExecution` with the full command line.
	 *
	 * @param command The command to execute.
	 * @param args The command arguments.
	 * @param options Optional options for the started the shell.
	 */
	constructor(command: string | ShellQuotedString, args: (string | ShellQuotedString)[], options?: ShellExecutionOptions);

	/**
	 * The shell command line. Is `undefined` if created with a command and arguments.
	 */
	commandLine: string | undefined;

	/**
	 * The shell command. Is `undefined` if created with a full command line.
	 */
	command: string | ShellQuotedString;

	/**
	 * The shell args. Is `undefined` if created with a full command line.
	 */
	args: (string | ShellQuotedString)[];

	/**
	 * The shell options used when the command line is executed in a shell.
	 * Defaults to undefined.
	 */
	options?: ShellExecutionOptions;
}

/**
 * Class used to execute an extension callback as a task.
 */
export class CustomExecution {
	/**
	 * Constructs a CustomExecution task object. The callback will be executed when the task is run, at which point the
	 * extension should return the Pseudoterminal it will "run in". The task should wait to do further execution until
	 * [Pseudoterminal.open](#Pseudoterminal.open) is called. Task cancellation should be handled using
	 * [Pseudoterminal.close](#Pseudoterminal.close). When the task is complete fire
	 * [Pseudoterminal.onDidClose](#Pseudoterminal.onDidClose).
	 * @param callback The callback that will be called when the task is started by a user. Any ${} style variables that
	 * were in the task definition will be resolved and passed into the callback as `resolvedDefinition`.
	 */
	constructor(callback: (resolvedDefinition: TaskDefinition) => Thenable<Pseudoterminal>);
}

/**
 * The scope of a task.
 */
export enum TaskScope {
	/**
	 * The task is a global task. Global tasks are currently not supported.
	 */
	Global = 1,

	/**
	 * The task is a workspace task
	 */
	Workspace = 2
}

/**
 * Run options for a task.
 */
export interface RunOptions {
	/**
	 * Controls whether task variables are re-evaluated on rerun.
	 */
	reevaluateOnRerun?: boolean;
}

/**
 * A task to execute
 */
export class Task {

	/**
	 * Creates a new task.
	 *
	 * @param definition The task definition as defined in the taskDefinitions extension point.
	 * @param scope Specifies the task's scope. It is either a global or a workspace task or a task for a specific workspace folder. Global tasks are currently not supported.
	 * @param name The task's name. Is presented in the user interface.
	 * @param source The task's source (e.g. 'gulp', 'npm', ...). Is presented in the user interface.
	 * @param execution The process or shell execution.
	 * @param problemMatchers the names of problem matchers to use, like '$tsc'
	 *  or '$eslint'. Problem matchers can be contributed by an extension using
	 *  the `problemMatchers` extension point.
	 */
	constructor(taskDefinition: TaskDefinition, scope: WorkspaceFolder | TaskScope.Global | TaskScope.Workspace, name: string, source: string, execution?: ProcessExecution | ShellExecution | CustomExecution, problemMatchers?: string | string[]);

	/**
	 * Creates a new task.
	 *
	 * @deprecated Use the new constructors that allow specifying a scope for the task.
	 *
	 * @param definition The task definition as defined in the taskDefinitions extension point.
	 * @param name The task's name. Is presented in the user interface.
	 * @param source The task's source (e.g. 'gulp', 'npm', ...). Is presented in the user interface.
	 * @param execution The process or shell execution.
	 * @param problemMatchers the names of problem matchers to use, like '$tsc'
	 *  or '$eslint'. Problem matchers can be contributed by an extension using
	 *  the `problemMatchers` extension point.
	 */
	constructor(taskDefinition: TaskDefinition, name: string, source: string, execution?: ProcessExecution | ShellExecution, problemMatchers?: string | string[]);

	/**
	 * The task's definition.
	 */
	definition: TaskDefinition;

	/**
	 * The task's scope.
	 */
	readonly scope?: TaskScope.Global | TaskScope.Workspace | WorkspaceFolder;

	/**
	 * The task's name
	 */
	name: string;

	/**
	 * A human-readable string which is rendered less prominently on a separate line in places
	 * where the task's name is displayed. Supports rendering of [theme icons](#ThemeIcon)
	 * via the `$(<name>)`-syntax.
	 */
	detail?: string;

	/**
	 * The task's execution engine
	 */
	execution?: ProcessExecution | ShellExecution | CustomExecution;

	/**
	 * Whether the task is a background task or not.
	 */
	isBackground: boolean;

	/**
	 * A human-readable string describing the source of this shell task, e.g. 'gulp'
	 * or 'npm'. Supports rendering of [theme icons](#ThemeIcon) via the `$(<name>)`-syntax.
	 */
	source: string;

	/**
	 * The task group this tasks belongs to. See TaskGroup
	 * for a predefined set of available groups.
	 * Defaults to undefined meaning that the task doesn't
	 * belong to any special group.
	 */
	group?: TaskGroup;

	/**
	 * The presentation options. Defaults to an empty literal.
	 */
	presentationOptions: TaskPresentationOptions;

	/**
	 * The problem matchers attached to the task. Defaults to an empty
	 * array.
	 */
	problemMatchers: string[];

	/**
	 * Run options for the task
	 */
	runOptions: RunOptions;
}

/**
 * A task provider allows to add tasks to the task service.
 * A task provider is registered via #tasks.registerTaskProvider.
 */
export interface TaskProvider<T extends Task = Task> {
	/**
	 * Provides tasks.
	 * @param token A cancellation token.
	 * @return an array of tasks
	 */
	provideTasks(token: CancellationToken): ProviderResult<T[]>;

	/**
	 * Resolves a task that has no [`execution`](#Task.execution) set. Tasks are
	 * often created from information found in the `tasks.json`-file. Such tasks miss
	 * the information on how to execute them and a task provider must fill in
	 * the missing information in the `resolveTask`-method. This method will not be
	 * called for tasks returned from the above `provideTasks` method since those
	 * tasks are always fully resolved. A valid default implementation for the
	 * `resolveTask` method is to return `undefined`.
	 *
	 * @param task The task to resolve.
	 * @param token A cancellation token.
	 * @return The resolved task
	 */
	resolveTask(task: T, token: CancellationToken): ProviderResult<T>;
}

/**
 * An object representing an executed Task. It can be used
 * to terminate a task.
 *
 * This interface is not intended to be implemented.
 */
export interface TaskExecution {
	/**
	 * The task that got started.
	 */
	task: Task;

	/**
	 * Terminates the task execution.
	 */
	terminate(): void;
}

/**
 * An event signaling the start of a task execution.
 *
 * This interface is not intended to be implemented.
 */
interface TaskStartEvent {
	/**
	 * The task item representing the task that got started.
	 */
	readonly execution: TaskExecution;
}

/**
 * An event signaling the end of an executed task.
 *
 * This interface is not intended to be implemented.
 */
interface TaskEndEvent {
	/**
	 * The task item representing the task that finished.
	 */
	readonly execution: TaskExecution;
}

/**
 * An event signaling the start of a process execution
 * triggered through a task
 */
export interface TaskProcessStartEvent {

	/**
	 * The task execution for which the process got started.
	 */
	readonly execution: TaskExecution;

	/**
	 * The underlying process id.
	 */
	readonly processId: number;
}

/**
 * An event signaling the end of a process execution
 * triggered through a task
 */
export interface TaskProcessEndEvent {

	/**
	 * The task execution for which the process got started.
	 */
	readonly execution: TaskExecution;

	/**
	 * The process's exit code. Will be `undefined` when the task is terminated.
	 */
	readonly exitCode: number | undefined;
}

export interface TaskFilter {
	/**
	 * The task version as used in the tasks.json file.
	 * The string support the package.json semver notation.
	 */
	version?: string;

	/**
	 * The task type to return;
	 */
	type?: string;
}

/**
 * Namespace for tasks functionality.
 */
export namespace tasks {

	/**
	 * Register a task provider.
	 *
	 * @param type The task kind type this provider is registered for.
	 * @param provider A task provider.
	 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
	 */
	export function registerTaskProvider(type: string, provider: TaskProvider): Disposable;

	/**
	 * Fetches all tasks available in the systems. This includes tasks
	 * from `tasks.json` files as well as tasks from task providers
	 * contributed through extensions.
	 *
	 * @param filter Optional filter to select tasks of a certain type or version.
	 */
	export function fetchTasks(filter?: TaskFilter): Thenable<Task[]>;

	/**
	 * Executes a task that is managed by VS Code. The returned
	 * task execution can be used to terminate the task.
	 *
	 * @throws When running a ShellExecution or a ProcessExecution
	 * task in an environment where a new process cannot be started.
	 * In such an environment, only CustomExecution tasks can be run.
	 *
	 * @param task the task to execute
	 */
	export function executeTask(task: Task): Thenable<TaskExecution>;

	/**
	 * The currently active task executions or an empty array.
	 */
	export const taskExecutions: ReadonlyArray<TaskExecution>;

	/**
	 * Fires when a task starts.
	 */
	export const onDidStartTask: Event<TaskStartEvent>;

	/**
	 * Fires when a task ends.
	 */
	export const onDidEndTask: Event<TaskEndEvent>;

	/**
	 * Fires when the underlying process has been started.
	 * This event will not fire for tasks that don't
	 * execute an underlying process.
	 */
	export const onDidStartTaskProcess: Event<TaskProcessStartEvent>;

	/**
	 * Fires when the underlying process has ended.
	 * This event will not fire for tasks that don't
	 * execute an underlying process.
	 */
	export const onDidEndTaskProcess: Event<TaskProcessEndEvent>;
}

```

## task实现代码

Task比较难找，先试试ShellExecution吧。

```ts

export namespace ShellExecutionDTO {
	export function is(value: tasks.ShellExecutionDTO | tasks.ProcessExecutionDTO | tasks.CustomExecutionDTO | undefined): value is tasks.ShellExecutionDTO {
		if (value) {
			const candidate = value as tasks.ShellExecutionDTO;
			return candidate && (!!candidate.commandLine || !!candidate.command);
		} else {
			return false;
		}
	}
	export function from(value: vscode.ShellExecution): tasks.ShellExecutionDTO | undefined {
		if (value === undefined || value === null) {
			return undefined;
		}
		const result: tasks.ShellExecutionDTO = {
		};
		if (value.commandLine !== undefined) {
			result.commandLine = value.commandLine;
		} else {
			result.command = value.command;
			result.args = value.args;
		}
		if (value.options) {
			result.options = ShellExecutionOptionsDTO.from(value.options);
		}
		return result;
	}
	export function to(value: tasks.ShellExecutionDTO): types.ShellExecution | undefined {
		if (value === undefined || value === null || (value.command === undefined && value.commandLine === undefined)) {
			return undefined;
		}
		if (value.commandLine) {
			return new types.ShellExecution(value.commandLine, value.options);
		} else {
			return new types.ShellExecution(value.command!, value.args ? value.args : [], value.options);
		}
	}
}

```

貌似只是判断了一下类型和赋值。

继续找具体执行的代码。

实现的代码：

```ts

@es5ClassCompat
export class ShellExecution implements vscode.ShellExecution {

	private _commandLine: string | undefined;
	private _command: string | vscode.ShellQuotedString | undefined;
	private _args: (string | vscode.ShellQuotedString)[] = [];
	private _options: vscode.ShellExecutionOptions | undefined;

	constructor(commandLine: string, options?: vscode.ShellExecutionOptions);
	constructor(command: string | vscode.ShellQuotedString, args: (string | vscode.ShellQuotedString)[], options?: vscode.ShellExecutionOptions);
	constructor(arg0: string | vscode.ShellQuotedString, arg1?: vscode.ShellExecutionOptions | (string | vscode.ShellQuotedString)[], arg2?: vscode.ShellExecutionOptions) {
		if (Array.isArray(arg1)) {
			if (!arg0) {
				throw illegalArgument('command can\'t be undefined or null');
			}
			if (typeof arg0 !== 'string' && typeof arg0.value !== 'string') {
				throw illegalArgument('command');
			}
			this._command = arg0;
			this._args = arg1 as (string | vscode.ShellQuotedString)[];
			this._options = arg2;
		} else {
			if (typeof arg0 !== 'string') {
				throw illegalArgument('commandLine');
			}
			this._commandLine = arg0;
			this._options = arg1;
		}
	}

	get commandLine(): string | undefined {
		return this._commandLine;
	}

	set commandLine(value: string | undefined) {
		if (typeof value !== 'string') {
			throw illegalArgument('commandLine');
		}
		this._commandLine = value;
	}

	get command(): string | vscode.ShellQuotedString {
		return this._command ? this._command : '';
	}

	set command(value: string | vscode.ShellQuotedString) {
		if (typeof value !== 'string' && typeof value.value !== 'string') {
			throw illegalArgument('command');
		}
		this._command = value;
	}

	get args(): (string | vscode.ShellQuotedString)[] {
		return this._args;
	}

	set args(value: (string | vscode.ShellQuotedString)[]) {
		this._args = value || [];
	}

	get options(): vscode.ShellExecutionOptions | undefined {
		return this._options;
	}

	set options(value: vscode.ShellExecutionOptions | undefined) {
		this._options = value;
	}

	public computeId(): string {
		const props: string[] = [];
		props.push('shell');
		if (this._commandLine !== undefined) {
			props.push(this._commandLine);
		}
		if (this._command !== undefined) {
			props.push(typeof this._command === 'string' ? this._command : this._command.value);
		}
		if (this._args && this._args.length > 0) {
			for (let arg of this._args) {
				props.push(typeof arg === 'string' ? arg : arg.value);
			}
		}
		return computeTaskExecutionId(props);
	}
}

```

有了一点点的进展，运行task调用了taskservice的run。

## TaskService

"C:\Users\tootal\Documents\Projects\vscode\src\vs\workbench\contrib\tasks\browser\abstractTaskService.ts"

```ts
export interface ITaskService {
	readonly _serviceBrand: undefined;
	onDidStateChange: Event<TaskEvent>;
	supportsMultipleTaskExecutions: boolean;

	configureAction(): Action;
	build(): Promise<ITaskSummary>;
	runTest(): Promise<ITaskSummary>;
	run(task: Task | undefined, options?: ProblemMatcherRunOptions): Promise<ITaskSummary | undefined>;
	inTerminal(): boolean;
	isActive(): Promise<boolean>;
	getActiveTasks(): Promise<Task[]>;
	getBusyTasks(): Promise<Task[]>;
	restart(task: Task): void;
	terminate(task: Task): Promise<TaskTerminateResponse>;
	terminateAll(): Promise<TaskTerminateResponse[]>;
	tasks(filter?: TaskFilter): Promise<Task[]>;
	taskTypes(): string[];
	getWorkspaceTasks(runSource?: TaskRunSource): Promise<Map<string, WorkspaceFolderTaskResult>>;
	readRecentTasks(): Promise<(Task | ConfiguringTask)[]>;
	removeRecentlyUsedTask(taskRecentlyUsedKey: string): void;
	/**
	 * @param alias The task's name, label or defined identifier.
	 */
	getTask(workspaceFolder: IWorkspace | IWorkspaceFolder | string, alias: string | TaskIdentifier, compareId?: boolean): Promise<Task | undefined>;
	tryResolveTask(configuringTask: ConfiguringTask): Promise<Task | undefined>;
	getTasksForGroup(group: string): Promise<Task[]>;
	getRecentlyUsedTasks(): LinkedMap<string, string>;
	migrateRecentTasks(tasks: Task[]): Promise<void>;
	createSorter(): TaskSorter;

	getTaskDescription(task: Task | ConfiguringTask): string | undefined;
	canCustomize(task: ContributedTask | CustomTask): boolean;
	customize(task: ContributedTask | CustomTask | ConfiguringTask, properties?: {}, openConfig?: boolean): Promise<void>;
	openConfig(task: CustomTask | ConfiguringTask | undefined): Promise<boolean>;

	registerTaskProvider(taskProvider: ITaskProvider, type: string): IDisposable;

	registerTaskSystem(scheme: string, taskSystemInfo: TaskSystemInfo): void;
	registerSupportedExecutions(custom?: boolean, shell?: boolean, process?: boolean): void;

	extensionCallbackTaskComplete(task: Task, result: number | undefined): Promise<void>;
}

```

这是一个接口，`AbstractTaskService`实现了该接口。下面是关键的`run`方法。

```ts
public run(task: Task | undefined, options?: ProblemMatcherRunOptions, runSource: TaskRunSource = TaskRunSource.System): Promise<ITaskSummary | undefined> {
	if (!task) {
		throw new TaskError(Severity.Info, nls.localize('TaskServer.noTask', 'Task to execute is undefined'), TaskErrors.TaskNotFound);
	}

	return new Promise<ITaskSummary | undefined>(async (resolve) => {
		let resolver = this.createResolver();
		if (options && options.attachProblemMatcher && this.shouldAttachProblemMatcher(task) && !InMemoryTask.is(task)) {
			const toExecute = await this.attachProblemMatcher(task);
			if (toExecute) {
				resolve(this.executeTask(toExecute, resolver, runSource));
			} else {
				resolve(undefined);
			}
		} else {
			resolve(this.executeTask(task, resolver, runSource));
		}
	}).then((value) => {
		if (runSource === TaskRunSource.User) {
			this.getWorkspaceTasks().then(workspaceTasks => {
				RunAutomaticTasks.promptForPermission(this, this.storageService, this.notificationService, workspaceTasks);
			});
		}
		return value;
	}, (error) => {
		this.handleError(error);
		return Promise.reject(error);
	});
}

```

大概看了一下，关键部分应该是这句：

`resolve(this.executeTask(task, resolver, runSource));`


### executeTask

```ts

private executeTask(task: Task, resolver: ITaskResolver, runSource: TaskRunSource): Promise<ITaskSummary> {
	enum SaveBeforeRunConfigOptions {
		Always = 'always',
		Never = 'never',
		Prompt = 'prompt'
	}

	const saveBeforeRunTaskConfig: SaveBeforeRunConfigOptions = this.configurationService.getValue('task.saveBeforeRun');

	const execTask = async (task: Task, resolver: ITaskResolver): Promise<ITaskSummary> => {
		return ProblemMatcherRegistry.onReady().then(() => {
			let executeResult = this.getTaskSystem().run(task, resolver);
			return this.handleExecuteResult(executeResult, runSource);
		});
	};

	const saveAllEditorsAndExecTask = async (task: Task, resolver: ITaskResolver): Promise<ITaskSummary> => {
		return this.editorService.saveAll({ reason: SaveReason.AUTO }).then(() => {
			return execTask(task, resolver);
		});
	};

	const promptAsk = async (task: Task, resolver: ITaskResolver): Promise<ITaskSummary> => {
		const dialogOptions = await this.dialogService.show(
			Severity.Info,
			nls.localize('TaskSystem.saveBeforeRun.prompt.title', 'Save all editors?'),
			[nls.localize('saveBeforeRun.save', 'Save'), nls.localize('saveBeforeRun.dontSave', 'Don\'t save')],
			{
				detail: nls.localize('detail', "Do you want to save all editors before running the task?"),
				cancelId: 1
			}
		);

		if (dialogOptions.choice === 0) {
			return saveAllEditorsAndExecTask(task, resolver);
		} else {
			return execTask(task, resolver);
		}
	};

	if (saveBeforeRunTaskConfig === SaveBeforeRunConfigOptions.Never) {
		return execTask(task, resolver);
	} else if (saveBeforeRunTaskConfig === SaveBeforeRunConfigOptions.Prompt) {
		return promptAsk(task, resolver);
	} else {
		return saveAllEditorsAndExecTask(task, resolver);
	}
}

```

```ts
const execTask = async (task: Task, resolver: ITaskResolver): Promise<ITaskSummary> => {
	return ProblemMatcherRegistry.onReady().then(() => {
		let executeResult = this.getTaskSystem().run(task, resolver);
		return this.handleExecuteResult(executeResult, runSource);
	});
};
```

从上面几句可以看出，运行一个任务关键还是要调用`this.getTaskSystem().run(task, resolver);`，即`TaskSystem`的`run`方法。

## TaskSystem

对应的接口是`ITaskSystem`，其中`TerminalTaskSystem`和`ProcessTaskSystem`实现了该接口。

目前关键是看看Shell类型的任务是如何运行的，所以先看`TerminalTaskSystem`。


### run

核心的`run`方法：


```ts

public run(task: Task, resolver: ITaskResolver, trigger: string = Triggers.command): ITaskExecuteResult {
	task = task.clone(); // A small amount of task state is stored in the task (instance) and tasks passed in to run may have that set already.
	const recentTaskKey = task.getRecentlyUsedKey() ?? '';
	let validInstance = task.runOptions && task.runOptions.instanceLimit && this.instances[recentTaskKey] && this.instances[recentTaskKey].instances < task.runOptions.instanceLimit;
	let instance = this.instances[recentTaskKey] ? this.instances[recentTaskKey].instances : 0;
	this.currentTask = new VerifiedTask(task, resolver, trigger);
	if (instance > 0) {
		task.instance = this.instances[recentTaskKey].counter;
	}
	let lastTaskInstance = this.getLastInstance(task);
	let terminalData = lastTaskInstance ? this.activeTasks[lastTaskInstance.getMapKey()] : undefined;
	if (terminalData && terminalData.promise && !validInstance) {
		this.lastTask = this.currentTask;
		return { kind: TaskExecuteKind.Active, task: terminalData.task, active: { same: true, background: task.configurationProperties.isBackground! }, promise: terminalData.promise };
	}

	try {
		const executeResult = { kind: TaskExecuteKind.Started, task, started: {}, promise: this.executeTask(task, resolver, trigger, new Set()) };
		executeResult.promise.then(summary => {
			this.lastTask = this.currentTask;
		});
		if (InMemoryTask.is(task) || !this.isTaskEmpty(task)) {
			if (!this.instances[recentTaskKey]) {
				this.instances[recentTaskKey] = new InstanceManager();
			}
			this.instances[recentTaskKey].addInstance();
		}
		return executeResult;
	} catch (error) {
		if (error instanceof TaskError) {
			throw error;
		} else if (error instanceof Error) {
			this.log(error.message);
			throw new TaskError(Severity.Error, error.message, TaskErrors.UnknownError);
		} else {
			this.log(error.toString());
			throw new TaskError(Severity.Error, nls.localize('TerminalTaskSystem.unknownError', 'A unknown error has occurred while executing a task. See task output log for details.'), TaskErrors.UnknownError);
		}
	}
}

```

关键应该是这里：

```ts
const executeResult = { kind: TaskExecuteKind.Started, task, started: {}, promise: this.executeTask(task, resolver, trigger, new Set()) };
executeResult.promise.then(summary => {
	this.lastTask = this.currentTask;
});
if (InMemoryTask.is(task) || !this.isTaskEmpty(task)) {
	if (!this.instances[recentTaskKey]) {
		this.instances[recentTaskKey] = new InstanceManager();
	}
	this.instances[recentTaskKey].addInstance();
}
return executeResult;
```

然后就是调用了`executeTask`。


### executeTask

```ts
private async executeTask(task: Task, resolver: ITaskResolver, trigger: string, encounteredDependencies: Set<string>, alreadyResolved?: Map<string, string>): Promise<ITaskSummary> {
	if (encounteredDependencies.has(task.getCommonTaskId())) {
		this.showDependencyCycleMessage(task);
		return {};
	}

	alreadyResolved = alreadyResolved ?? new Map<string, string>();
	let promises: Promise<ITaskSummary>[] = [];
	if (task.configurationProperties.dependsOn) {
		for (const dependency of task.configurationProperties.dependsOn) {
			let dependencyTask = await resolver.resolve(dependency.uri, dependency.task!);
			if (dependencyTask) {
				let key = dependencyTask.getMapKey();
				let promise = this.activeTasks[key] ? this.activeTasks[key].promise : undefined;
				if (!promise) {
					this._onDidStateChange.fire(TaskEvent.create(TaskEventKind.DependsOnStarted, task));
					encounteredDependencies.add(task.getCommonTaskId());
					promise = this.executeDependencyTask(dependencyTask, resolver, trigger, encounteredDependencies, alreadyResolved);
				}
				promises.push(promise);
				if (task.configurationProperties.dependsOrder === DependsOrder.sequence) {
					const promiseResult = await promise;
					if (promiseResult.exitCode === 0) {
						promise = Promise.resolve(promiseResult);
					} else {
						promise = Promise.reject(promiseResult);
						break;
					}
				}
				promises.push(promise);
			} else {
				this.log(nls.localize('dependencyFailed',
					'Couldn\'t resolve dependent task \'{0}\' in workspace folder \'{1}\'',
					Types.isString(dependency.task) ? dependency.task : JSON.stringify(dependency.task, undefined, 0),
					dependency.uri.toString()
				));
				this.showOutput();
			}
		}
	}

	if ((ContributedTask.is(task) || CustomTask.is(task)) && (task.command)) {
		return Promise.all(promises).then((summaries): Promise<ITaskSummary> | ITaskSummary => {
			encounteredDependencies.delete(task.getCommonTaskId());
			for (let summary of summaries) {
				if (summary.exitCode !== 0) {
					this.removeInstances(task);
					return { exitCode: summary.exitCode };
				}
			}
			if (this.isRerun) {
				return this.reexecuteCommand(task, trigger, alreadyResolved!);
			} else {
				return this.executeCommand(task, trigger, alreadyResolved!);
			}
		});
	} else {
		return Promise.all(promises).then((summaries): ITaskSummary => {
			encounteredDependencies.delete(task.getCommonTaskId());
			for (let summary of summaries) {
				if (summary.exitCode !== 0) {
					return { exitCode: summary.exitCode };
				}
			}
			return { exitCode: 0 };
		});
	}
}
```

先处理了任务的依赖关系，关键步骤`executeCommand`。

### executeCommand

大致做了如下事情：

* getWorkspaceFolder
* systemInfo
* collectTaskVariables
* acquireInput（获取输入变量）
* executeInTerminal

### executeInTerminal

这个函数挺长的，大概有250行。

