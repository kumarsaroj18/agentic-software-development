// Auto-generated data for Code Issues webapp
const DATA = {
  "Server & Infrastructure": [
    {
      "Code Issue / Anti-Pattern Identified": "Missing timeouts on external calls",
      "What the Issue Is": "An outbound HTTP, RPC or database call is made without an explicit connect and read timeout, so the client falls back to the library default, which is often unlimited. The calling thread or coroutine stays parked for as long as the remote side holds the socket open. Under load the callers accumulate faster than they drain, and the service exhausts its thread pool while remaining formally healthy.",
      "Topic / Framework(s)": "Google SRE, Release It!, AWS Well-Architected, CNCF Cloud Native",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Semgrep, SonarQube",
      "Why This Matters": "Prevents cascading failures"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unbounded or naive retry logic",
      "What the Issue Is": "Failed calls are retried without a cap on attempts, without an overall deadline, or on error classes that will never succeed such as a 400 or a validation failure. The retries add load to a dependency that is already struggling. What began as a partial degradation upstream is converted into a sustained traffic multiplier that prevents recovery.",
      "Topic / Framework(s)": "Google SRE, Release It!, Netflix Chaos, CNCF Cloud Native",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Retry storms under failure"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No circuit breaker or bulkhead",
      "What the Issue Is": "There is no component that stops sending traffic to a dependency after a run of failures, and no partitioning of resources so that one slow dependency cannot consume the whole thread or connection pool. Every request keeps trying the broken path and keeps paying the full timeout. One failing downstream then holds all the capacity of the service that calls it.",
      "Topic / Framework(s)": "Google SRE, Release It!, Netflix Chaos, CNCF Cloud Native",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep (custom rules)",
      "Why This Matters": "Dependency isolation"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Synchronous dependency chains",
      "What the Issue Is": "A request is served by calling one service, which calls another, which calls another, each blocking on the next. Availability multiplies down the chain and latency adds up, so a five-hop chain of 99.9% services is materially less reliable than any single hop. The structure is only visible by reading several services together, not from any one of them.",
      "Topic / Framework(s)": "Release It!, Netflix Chaos, AWS Well-Architected, CNCF Cloud Native",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Prevents graceful degradation"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hard failure on partial dependency failure",
      "What the Issue Is": "A dependency that is not essential to the response, such as a recommendation, a badge count or an analytics enrichment, is treated as mandatory. When it fails or times out, the whole request fails rather than returning the core result without the optional part. The product loses more function during an incident than the incident actually justifies.",
      "Topic / Framework(s)": "Netflix Chaos, Google SRE, CNCF Cloud Native",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Chaos-unready systems"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Resource leaks (connections, threads)",
      "What the Issue Is": "Connections, file handles, threads, sockets or streams are opened on a code path that does not reliably close them, typically because the close happens after a return or is skipped on the exception path. Each leaked handle is small, so the service looks fine for hours. It then fails abruptly when the pool or the file descriptor limit is reached.",
      "Topic / Framework(s)": "Release It!, Google SRE, Static Performance",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SpotBugs, PMD",
      "Why This Matters": "Slow resource exhaustion"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Blocking calls on main / request thread",
      "What the Issue Is": "Blocking I/O, a synchronous disk read, a lock acquisition or CPU-heavy work runs on the thread that is supposed to be dispatching requests, or on an event loop that must stay free. Throughput collapses to the speed of the slowest blocking operation. In an async runtime a single blocking call stalls every other task sharing that loop.",
      "Topic / Framework(s)": "Static Performance, Google SRE, CNCF Cloud Native",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SpotBugs",
      "Why This Matters": "Latency collapse"
    },
    {
      "Code Issue / Anti-Pattern Identified": "N+1 query pattern",
      "What the Issue Is": "A collection is fetched with one query, and then a further query is issued per element to load a related field, usually through an ORM relation accessed inside a loop. One logical read becomes hundreds of round trips. The code reads naturally and the cost is entirely invisible at the call site.",
      "Topic / Framework(s)": "Static Performance, AWS Well-Architected",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Poor scalability"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Inefficient loops causing API call explosions",
      "What the Issue Is": "Code iterates over a collection and performs a network or API call for each element, instead of using a batch or bulk endpoint. Request volume scales with input size rather than with the number of operations the user asked for. Rate limits, cost and latency all grow linearly with data that the caller does not control.",
      "Topic / Framework(s)": "Static Performance, AWS Well-Architected",
      "Area / Pillar": "Cost, Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Cost + throttling"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hardcoded configuration values",
      "What the Issue Is": "Endpoint URLs, ports, feature toggles, credentials, bucket names, timeouts or limits are written as literals in source rather than read from configuration. Changing any of them requires a code change, a build and a deploy. It also makes it impossible to run the same artifact in more than one environment.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt, AWS Well-Architected, NIST SSDF",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Violates externalized config"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Environment-specific branching in code",
      "What the Issue Is": "The code inspects the environment name and branches on it, for example skipping validation in staging or using a different code path in development. The behaviour that was tested is not the behaviour that runs in production. The branch is also the most common route for debug and bypass logic to reach live traffic.",
      "Topic / Framework(s)": "Twelve-Factor App, CI/CD, DORA",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Encourages drift"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hardcoded secrets / credentials",
      "What the Issue Is": "API keys, passwords, tokens or private keys appear as literals in source, configuration files or test fixtures. Once committed they exist in version control history permanently, and deleting the line does not remove them. Anyone with repository read access, including CI systems and forks, holds the credential.",
      "Topic / Framework(s)": "OWASP, CI/CD, Zero Trust, NIST SSDF, SLSA",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Gitleaks, TruffleHog",
      "Why This Matters": "Severe compromise risk"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Over-permissive access (wildcards)",
      "What the Issue Is": "An IAM policy, database grant, API scope or CORS rule uses a wildcard for the action, the resource or the origin rather than enumerating what is needed. The permission is far wider than the code actually exercises. Any compromise of the component inherits everything the wildcard allows.",
      "Topic / Framework(s)": "OWASP, Zero Trust, AWS Well-Architected, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Checkov, Semgrep",
      "Why This Matters": "Breaks least privilege"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Implicit trust between internal services",
      "What the Issue Is": "Calls between services inside the network perimeter carry no authentication or authorisation, on the assumption that anything already inside is trusted. A single compromised component can then call any other service directly. The trust boundary exists in the network diagram and nowhere in the code.",
      "Topic / Framework(s)": "Zero Trust, Netflix Chaos, CNCF Cloud Native",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Lateral movement risk"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing authentication on internal endpoints",
      "What the Issue Is": "Endpoints intended for internal, administrative or operational use, such as metrics, debug handlers, cache flush or job triggers, are served without an auth check. They are protected only by the assumption that nobody knows the path or can route to it. Both assumptions fail the first time an ingress rule, a proxy or a service mesh changes.",
      "Topic / Framework(s)": "OWASP, Zero Trust, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Common microservice flaw"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Weak or broken auth flows",
      "What the Issue Is": "The authentication or session flow has a logic defect: tokens that never expire, session identifiers not rotated after login, password reset links that can be reused, multi-factor steps that can be skipped by calling the next endpoint directly, or authorisation decided by a client-supplied field. Each defect spans several endpoints and states, so it does not look wrong in any single function.",
      "Topic / Framework(s)": "OWASP, Zero Trust, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Semgrep (partial)",
      "Why This Matters": "Requires flow reasoning"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Insecure deserialization",
      "What the Issue Is": "Serialised data from an untrusted source is deserialised into live objects using a format or library that can instantiate arbitrary types or invoke methods during construction. The payload stops being data and becomes instructions. In many runtimes this is a direct path to remote code execution.",
      "Topic / Framework(s)": "OWASP, SAST, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SpotBugs, Semgrep",
      "Why This Matters": "Known exploit vector"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unsafe API usage",
      "What the Issue Is": "A dangerous API is called in a way its documentation warns against: shell execution built from concatenated input, path handling that permits traversal, XML parsing with external entities enabled, or a regular expression with catastrophic backtracking on user input. The call sites are individually recognisable by pattern.",
      "Topic / Framework(s)": "SAST, OWASP, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "CodeQL",
      "Why This Matters": "High precision detection"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Race conditions",
      "What the Issue Is": "Two or more concurrent execution paths read and write the same state without coordination, so the result depends on interleaving. Typical forms are check-then-act on a shared value, a lazily initialised singleton, or a balance updated by read-modify-write. The defect passes every test and appears only under production concurrency.",
      "Topic / Framework(s)": "SAST, Static Performance, CWE Top 25",
      "Area / Pillar": "Security, Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "SpotBugs",
      "Why This Matters": "Concurrency hazards"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Weak or deprecated cryptography",
      "What the Issue Is": "The code uses a hash, cipher, mode or key length that is no longer considered safe, such as MD5 or SHA-1 for integrity, DES, ECB mode, a static initialisation vector, or a home-grown scheme. It may also use a fast general-purpose hash where a password-specific one is required. The code looks correct because the operation itself succeeds.",
      "Topic / Framework(s)": "OWASP, SAST, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Compliance risk"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Feature flags without kill-switch",
      "What the Issue Is": "A feature flag exists but there is no reliable way to turn the feature off in production without a deploy, because the flag is read once at startup, cached indefinitely, or embedded in a build artifact. The flag gives the appearance of control without the ability to exercise it. Recovery during an incident then requires a full release.",
      "Topic / Framework(s)": "Config Mgmt, Release It!, DORA",
      "Area / Pillar": "Operability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "No safe rollback"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Long-lived or dead feature flags",
      "What the Issue Is": "Flags that have completed their rollout are never removed, so both branches remain in the codebase and both must keep working. Every subsequent change has to be reasoned about twice. In practice one of the two paths stops being exercised and quietly rots.",
      "Topic / Framework(s)": "Config Mgmt, CI/CD, DORA",
      "Area / Pillar": "Operability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Hidden risk accumulation"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Feature flags controlling schema changes",
      "What the Issue Is": "A flag gates behaviour that depends on a schema change already applied to the database, or the flag itself decides which schema shape to write. Turning the flag off does not restore the previous state because the data has already changed. What looks like a reversible switch is not reversible.",
      "Topic / Framework(s)": "Config Mgmt, Release It!",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Rollback nightmare"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No structured logging",
      "What the Issue Is": "Log lines are emitted as free-form interpolated strings rather than as structured events with named fields. They cannot be filtered, aggregated or correlated without brittle regular expressions. The information is technically present and practically unqueryable during an incident.",
      "Topic / Framework(s)": "Twelve-Factor App, Observability, CNCF Cloud Native",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SonarQube",
      "Why This Matters": "Breaks log aggregation"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Logs without severity levels",
      "What the Issue Is": "Everything is logged at a single level, or levels are used inconsistently so that routine events are logged as errors and genuine failures as info. Alerting cannot be built on the log stream, and the volume trains everyone to ignore it. The signal-to-noise ratio is set by accident rather than by design.",
      "Topic / Framework(s)": "Observability, Google SRE",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SonarQube",
      "Why This Matters": "Alerting noise"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing correlation / request IDs",
      "What the Issue Is": "A request identifier is not generated at the edge, or not propagated through downstream calls, background jobs and log lines. Individual services can each be inspected but their records cannot be joined. Reconstructing one user's failing request becomes manual guesswork across timestamps.",
      "Topic / Framework(s)": "Observability, Google SRE, CNCF Cloud Native",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Slows incident response"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Metrics without dimensions / labels",
      "What the Issue Is": "Metrics are emitted as bare counters or gauges without the labels needed to slice them, such as endpoint, status class, tenant or region. An aggregate that looks healthy can hide a total failure for one segment. The data needed to answer the obvious follow-up question was never recorded.",
      "Topic / Framework(s)": "Observability, AWS Well-Architected, CNCF Cloud Native",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Poor diagnostics"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing tracing instrumentation",
      "What the Issue Is": "Distributed tracing is absent, or spans are created only at the process boundary so the internal breakdown of a request is missing. Latency can be observed but not attributed. Every performance investigation starts from scratch with ad hoc logging.",
      "Topic / Framework(s)": "Observability, Netflix Chaos, CNCF Cloud Native",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "No latency visibility"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No graceful shutdown handling",
      "What the Issue Is": "The process does not handle termination signals, so on shutdown it exits immediately rather than refusing new work, finishing in-flight requests and closing connections. Every deploy, scale-down and node rotation drops a slice of live traffic. The errors appear as client-side failures with no server-side trace.",
      "Topic / Framework(s)": "Google SRE, Twelve-Factor App, CNCF Cloud Native",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Request loss on deploy"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No idempotency protection",
      "What the Issue Is": "An operation that can be retried by a client, a proxy or a queue has no mechanism to recognise that it has already been performed, such as an idempotency key, a natural unique constraint or a state check. The same request applied twice produces two effects. Duplicate delivery is normal in distributed systems rather than exceptional.",
      "Topic / Framework(s)": "AWS Well-Architected, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Duplicate side effects"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Secrets embedded in pipeline definitions",
      "What the Issue Is": "Credentials are written directly into pipeline YAML, job definitions or build scripts rather than injected from a secret store at run time. They are visible to everyone with repository access and to every fork and pull request build. Rotation requires editing and re-reviewing pipeline code.",
      "Topic / Framework(s)": "CI/CD, OWASP, SLSA",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Gitleaks",
      "Why This Matters": "Supply-chain risk"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hardcoded manual approval gates",
      "What the Issue Is": "A deployment pipeline requires a human to click approve at a fixed point, encoded in the pipeline rather than driven by policy or risk. The gate blocks low-risk changes as heavily as high-risk ones. It becomes a queue rather than a control, and gets approved reflexively.",
      "Topic / Framework(s)": "CI/CD, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Slows flow"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No rollback hooks or safeguards",
      "What the Issue Is": "The deployment process can move forward but has no defined, tested way to move back: no previous artifact retained, no reverse migration, no automated trigger on a health signal. Recovery from a bad release depends on improvisation during the incident. Mean time to recovery is set by how fast someone can write a fix.",
      "Topic / Framework(s)": "CI/CD, Release It!, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Increases MTTR"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unpinned or mutable dependencies",
      "What the Issue Is": "Dependencies are declared with floating ranges, mutable tags or no lockfile, so two builds of the same commit can resolve different code. Builds stop being reproducible and an upstream change reaches production without review. The diff that caused an incident may not exist in your repository at all.",
      "Topic / Framework(s)": "SLSA, NIST SSDF, OWASP",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Dependabot, Renovate",
      "Why This Matters": "Dependency poisoning risk"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Use of untrusted build scripts",
      "What the Issue Is": "The build executes scripts fetched at build time, or runs package lifecycle hooks from arbitrary transitive dependencies, with full access to the build environment. Any of those scripts can read credentials or modify the artifact. The trust placed in a dependency extends to its entire tree.",
      "Topic / Framework(s)": "SLSA, CI/CD",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Build integrity loss"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Logging of PII or sensitive data",
      "What the Issue Is": "Personal data, authentication tokens, full request or response bodies, or card details are written to application logs. Log storage rarely carries the access controls, retention limits or deletion capability that the source system does. The logging system becomes the least governed copy of the most sensitive data.",
      "Topic / Framework(s)": "OWASP, NIST SSDF, Privacy/GDPR",
      "Area / Pillar": "Security, Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Regulatory exposure"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Debug/test code left in production",
      "What the Issue Is": "Debug endpoints, verbose error output, seeded test accounts, mock switches or bypass flags remain reachable in the production build. They usually exist to make development convenient and were never intended to ship. Each one is a documented way around a control.",
      "Topic / Framework(s)": "NIST SSDF, OWASP",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Hidden attack surface"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing health/readiness probes",
      "What the Issue Is": "The service exposes no health or readiness endpoint, so the orchestrator has no signal beyond whether the process is running. Traffic is routed to instances that are still starting or are dependent-down. Failed instances are not restarted because nothing reports them as failed.",
      "Topic / Framework(s)": "CNCF Cloud Native, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Poor orchestration behavior"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Retry without jitter or backoff cap",
      "What the Issue Is": "Retries are spaced by a fixed or purely exponential delay with no random jitter and no ceiling. All the failed clients wake at the same moment and retry in a synchronised wave. The recovering dependency is knocked over again by the retry pattern itself.",
      "Topic / Framework(s)": "Google SRE, AWS Well-Architected, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Synchronised retry storms after a blip"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Retry on non-idempotent operation",
      "What the Issue Is": "A retry wraps an operation that changes state and has no deduplication, such as a payment, an email, a message publish or an insert. The first attempt may have succeeded before the timeout that triggered the retry. The caller cannot distinguish a lost response from a failed request.",
      "Topic / Framework(s)": "AWS Well-Architected, Release It!",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Duplicate charges, duplicate orders"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unbounded in-memory queue, cache or buffer",
      "What the Issue Is": "A queue, cache, buffer or accumulator grows in memory with no maximum size, no eviction and no backpressure. It absorbs load silently until the process is killed by the memory limit. The failure mode is a hard restart with the loss of everything the structure held.",
      "Topic / Framework(s)": "Release It!, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "SpotBugs (partial)",
      "Why This Matters": "Heap exhaustion under load spike"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Query or API without pagination or result cap",
      "What the Issue Is": "A query or endpoint returns everything that matches, with no page size, no maximum limit and no cursor. Response size is controlled by the data rather than by the API. It works for years on small tenants and fails on the first large one.",
      "Topic / Framework(s)": "Static Performance, AWS Well-Architected",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One large tenant takes the service down"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing rate limiting on public or expensive endpoints",
      "What the Issue Is": "Endpoints that are publicly reachable, or that are expensive per call, have no per-client rate limit or quota. A single misbehaving client, script or crawler can consume the capacity intended for everyone. Cost, when the endpoint fans out to a paid service, is equally uncapped.",
      "Topic / Framework(s)": "OWASP API Top 10, Google SRE",
      "Area / Pillar": "Reliability, Cost",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep (custom rules)",
      "Why This Matters": "No defence against abuse or a looping client"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Connection pool sized inconsistently with thread pool",
      "What the Issue Is": "The database connection pool is smaller or larger than the number of threads or concurrent requests that will contend for it, and the two numbers are configured in different files by different people. Too small and requests queue on connection acquisition; too large and the database is overwhelmed. The mismatch is only visible by reading both settings together.",
      "Topic / Framework(s)": "Release It!, Static Performance",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Pool exhaustion presents as random latency"
    },
    {
      "Code Issue / Anti-Pattern Identified": "External call inside a database transaction",
      "What the Issue Is": "An HTTP call, a message publish or another remote operation is performed while a database transaction is open. Locks and a connection are held for the duration of a network round trip that may take seconds. Database concurrency is then bounded by the latency of an unrelated system.",
      "Topic / Framework(s)": "Static Performance, Release It!",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Locks held for the duration of a network call"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing index for a filtered or sorted column",
      "What the Issue Is": "A column used in a WHERE, JOIN or ORDER BY clause on a large table has no supporting index. The query planner falls back to a full scan. Response time degrades in proportion to table growth rather than to result size, so the regression arrives gradually.",
      "Topic / Framework(s)": "Static Performance, AWS Well-Architected",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Full scans that only appear at production data volume"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing optimistic locking or version column on concurrent updates",
      "What the Issue Is": "Two concurrent requests read the same row, each modify it in memory, and each write it back, with no version column, no conditional update and no row lock. The second write silently discards the first one's change. Nothing errors, and the loss is only detectable by comparing against what the user submitted.",
      "Topic / Framework(s)": "Static Performance, CWE Top 25",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Silent lost updates"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Schema migration coupled to application deploy (no expand/contract)",
      "What the Issue Is": "The schema change and the application code that requires it are released together as one unit, rather than in the expand, migrate, contract sequence. During a rolling deploy both versions run against one schema, and whichever version does not match it fails. Rollback is also blocked, because reverting the code leaves the schema ahead of it.",
      "Topic / Framework(s)": "Release It!, DORA, CI/CD",
      "Area / Pillar": "Delivery, Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Rollback of the app leaves the schema ahead"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Long-running or table-locking migration",
      "What the Issue Is": "A migration performs work whose duration scales with table size, or takes a lock that blocks reads or writes for that duration. On a development dataset it completes instantly. On production it holds the table long enough to time out every request that touches it.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Squawk, migration linters",
      "Why This Matters": "Deploy-time outage on large tables"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No dead-letter queue or poison-message handling",
      "What the Issue Is": "A message consumer has no configured destination for messages it cannot process, and no rule for how many failures are enough. The message is redelivered indefinitely. One unprocessable payload consumes the consumer's entire throughput and blocks everything behind it.",
      "Topic / Framework(s)": "CNCF Cloud Native, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One bad message halts a consumer indefinitely"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Consumer assumes exactly-once delivery, no dedupe",
      "What the Issue Is": "The consumer is written as though each message will arrive exactly once, with no deduplication key and no check for work already done. Almost all brokers guarantee at-least-once delivery instead. Duplicates are therefore certain rather than possible.",
      "Topic / Framework(s)": "AWS Well-Architected, CNCF Cloud Native",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Duplicate side effects on broker redelivery"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Cache without TTL or invalidation strategy",
      "What the Issue Is": "Values are written to a cache with no expiry and no rule for what invalidates them when the underlying data changes. The cache and the source of truth drift apart. Users see stale data with no signal, and the only reliable fix is a full flush.",
      "Topic / Framework(s)": "Google SRE, Static Performance",
      "Area / Pillar": "Correctness, Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Stale data with no expiry path"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Cache stampede on expiry (no single-flight)",
      "What the Issue Is": "A popular cache entry expires and every concurrent request misses at the same moment, so all of them recompute or refetch it simultaneously. There is no single-flight lock or staggered expiry. Peak load on the backing store arrives precisely when the cache stops protecting it.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Thundering herd hits the origin at once"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Swallowed or over-broad exception handling",
      "What the Issue Is": "An exception is caught and discarded, logged without being re-raised, or caught with a broad catch-all that also swallows unrelated failures. The system continues in a state the author never considered. The original error, which was the most useful diagnostic, no longer exists anywhere.",
      "Topic / Framework(s)": "SAST, Observability, CWE Top 25",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SonarQube, SpotBugs, PMD",
      "Why This Matters": "Failures become invisible"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Stack traces or internal errors returned to clients",
      "What the Issue Is": "Unhandled exceptions propagate to the client as stack traces, SQL fragments, file paths or framework error pages. The response reveals the internal structure, versions and sometimes credentials. It is also unusable for the client as an error contract.",
      "Topic / Framework(s)": "OWASP, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Information disclosure"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing object-level authorisation (IDOR / BOLA)",
      "What the Issue Is": "An endpoint accepts an object identifier from the request and returns or modifies that object after checking only that the caller is authenticated, not that they own it. Changing the identifier in the URL yields someone else's record. Authentication is present and authorisation is missing.",
      "Topic / Framework(s)": "OWASP API Top 10, Zero Trust",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The most common and most damaging API flaw"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Excessive data exposure in API responses",
      "What the Issue Is": "An API returns the full internal representation of an object and relies on the client to display only the relevant fields. Fields such as internal identifiers, flags, cost data or another user's details travel over the wire regardless. The response body carries more than the feature requires.",
      "Topic / Framework(s)": "OWASP API Top 10, Privacy/GDPR",
      "Area / Pillar": "Security, Privacy",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Entity serialised whole, including fields the caller must not see"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Mass assignment / over-posting on request binding",
      "What the Issue Is": "Request bodies are bound directly onto domain or persistence objects, so any field named in the payload is written. A caller can set fields the form never exposes, such as role, price, tenant or verified status. The vulnerability lives in the absence of an allow-list rather than in any visible line.",
      "Topic / Framework(s)": "OWASP API Top 10, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Client sets fields it should not control"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing tenant scoping in queries",
      "What the Issue Is": "In a multi-tenant system a query filters on the business predicate but omits the tenant or organisation identifier, usually because the scoping is applied by convention in a base class or a middleware that this path bypasses. One missed predicate returns another customer's data. Finding every instance requires reading every query.",
      "Topic / Framework(s)": "Zero Trust, OWASP API Top 10",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Cross-tenant data leak in multi-tenant systems"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unvalidated outbound URL (SSRF)",
      "What the Issue Is": "The server fetches a URL supplied or influenced by the caller without validating the destination against an allow-list. The request originates inside the trust boundary and can reach internal services, cloud metadata endpoints and localhost. The feature usually exists for a legitimate reason such as webhooks or link previews.",
      "Topic / Framework(s)": "OWASP, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, CodeQL",
      "Why This Matters": "Pivot into internal network"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unbounded upload size or missing content-type validation",
      "What the Issue Is": "An upload endpoint accepts a request body with no maximum size, and does not verify that the declared or actual content type is one the system handles. A single request can exhaust disk or memory. A file whose type differs from its extension can also be served back to other users.",
      "Topic / Framework(s)": "OWASP, Release It!",
      "Area / Pillar": "Security, Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Memory and storage exhaustion"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No audit trail on sensitive or privileged operations",
      "What the Issue Is": "Privileged and sensitive operations such as permission changes, data exports, refunds and administrative overrides are performed without writing an immutable record of who did what and when. After an incident there is no way to establish the sequence of events. Regulated environments treat the absence of the record as the finding.",
      "Topic / Framework(s)": "NIST SSDF, Privacy/GDPR, Zero Trust",
      "Area / Pillar": "Compliance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Cannot answer \"who changed this\""
    },
    {
      "Code Issue / Anti-Pattern Identified": "No data retention or deletion path for PII",
      "What the Issue Is": "Personal data is written but there is no defined retention period, no deletion routine and often no way to locate every copy of it. Data accumulates indefinitely across the primary store, backups, caches, logs and analytics. A deletion request cannot be honoured because nobody can enumerate the copies.",
      "Topic / Framework(s)": "Privacy/GDPR, NIST SSDF",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Regulatory exposure that grows with time"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Container runs as root or uses a mutable tag",
      "What the Issue Is": "The container image runs as the root user, or is referenced by a mutable tag such as latest, so what is deployed is not pinned to a specific build. Root inside the container widens the blast radius of any escape. A mutable tag means the running image can change without any change in your repository.",
      "Topic / Framework(s)": "CNCF Cloud Native, SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain, Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Trivy, Checkov, Hadolint",
      "Why This Matters": "Non-reproducible and over-privileged runtime"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No resource requests/limits or autoscaling policy",
      "What the Issue Is": "Workloads are deployed without CPU and memory requests and limits, or without a defined scaling policy. The scheduler cannot place them sensibly and one workload can starve its neighbours. Capacity and cost are then determined by whatever happens to be running rather than by intent.",
      "Topic / Framework(s)": "CNCF Cloud Native, AWS Well-Architected",
      "Area / Pillar": "Cost, Reliability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Checkov, kube-linter",
      "Why This Matters": "Noisy neighbour and unbounded spend"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No SBOM or build provenance/signing",
      "What the Issue Is": "The build does not produce a software bill of materials, and the resulting artifact is neither signed nor accompanied by provenance describing how it was built. Nobody downstream can verify what is inside it or where it came from. During a disclosed upstream vulnerability there is no way to answer whether you are affected.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Syft, Cosign",
      "Why This Matters": "Cannot answer a CVE question in hours"
    },
    {
      "Code Issue / Anti-Pattern Identified": "CI workflow with excessive permissions or untrusted trigger",
      "What the Issue Is": "A CI workflow is granted broad write permissions by default, or is triggered by an event that allows code from an untrusted contributor to run with access to secrets. The pipeline holds the strongest credentials in the organisation. The trigger configuration is what decides who can use them.",
      "Topic / Framework(s)": "SLSA, CI/CD, OWASP",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "zizmor, actionlint, Checkov",
      "Why This Matters": "Pipeline becomes the attack path"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Liveness and readiness probes not distinguished",
      "What the Issue Is": "Liveness and readiness are wired to the same handler, so the orchestrator cannot distinguish is this process broken from is this process ready for traffic. A temporarily unready instance, for example one waiting on a dependency, gets restarted instead of removed from rotation. Restart loops then appear during any downstream slowdown.",
      "Topic / Framework(s)": "CNCF Cloud Native, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "kube-linter",
      "Why This Matters": "Restart loops during transient dependency failure"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No startup fail-fast on missing or invalid configuration",
      "What the Issue Is": "The application starts successfully with missing, malformed or default configuration and only fails later when the value is first used. The failure surfaces as a request error hours after deploy, far from its cause. Validating configuration at startup would have failed the rollout instead.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Service starts broken and fails on first request"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Trusting system clock for elapsed time or ordering",
      "What the Issue Is": "Elapsed time, timeouts, expiry or event ordering are computed from the wall-clock time, which can jump backwards or forwards through NTP correction, virtualisation or manual change. Durations become negative and ordering inverts. A monotonic clock exists for exactly this purpose.",
      "Topic / Framework(s)": "Static Performance, CWE Top 25",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SpotBugs, Semgrep",
      "Why This Matters": "Clock skew and NTP jumps produce impossible durations"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Floating point used for money",
      "What the Issue Is": "Monetary amounts are held in a float or double. Values such as 0.1 cannot be represented exactly, so arithmetic accumulates error and equality comparisons fail unpredictably. The discrepancies surface as reconciliation breaks rather than as exceptions.",
      "Topic / Framework(s)": "Static Performance, CWE Top 25",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SpotBugs, PMD",
      "Why This Matters": "Rounding errors in financial paths"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Timezone-naive datetimes at storage or API boundary",
      "What the Issue Is": "Timestamps are stored, transmitted or parsed without an explicit timezone or offset, so the value is interpreted in whatever the local zone of the process happens to be. The same instant then means different things in different components. Errors are subtle, are worst around DST transitions, and are hard to correct retrospectively.",
      "Topic / Framework(s)": "Static Performance",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep (custom rules)",
      "Why This Matters": "Off-by-hours bugs that only surface across regions"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Mutable static or singleton state shared across requests",
      "What the Issue Is": "State is held in a static field, a module-level variable or a singleton, and mutated while serving requests. In a threaded or async server the requests share it. Data from one user's request leaks into another's, which is both a correctness and a confidentiality defect.",
      "Topic / Framework(s)": "SAST, Static Performance, CWE Top 25",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "SpotBugs, PMD",
      "Why This Matters": "Cross-request data bleed under concurrency"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No consumer-driven contract tests between services",
      "What the Issue Is": "Services integrate without a machine-verifiable agreement about the shape of their exchanges, relying on documentation and manual coordination. A provider can change a field without any consumer's build failing. The break is discovered in a shared environment or in production rather than in CI.",
      "Topic / Framework(s)": "DORA, CI/CD, Release It!",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Pact, Specmatic",
      "Why This Matters": "Breaking change ships undetected"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Backup exists but restore is never exercised",
      "What the Issue Is": "Backups are configured and appear to run, but a restore has never been performed end to end into a usable system. Backup success is measured by the job exiting zero. Whether the data can actually be recovered, and how long it takes, is unknown until it matters.",
      "Topic / Framework(s)": "Google SRE, AWS Well-Architected",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Backups that cannot be restored are not backups"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Single-AZ or single-region deployment with no stated RPO/RTO",
      "What the Issue Is": "The system runs in one availability zone or one region, with no documented recovery point and recovery time objective. The tolerance for a zone or region failure has never been stated, so it has never been designed for. The architecture diagram usually implies more redundancy than the configuration provides.",
      "Topic / Framework(s)": "AWS Well-Architected, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Checkov",
      "Why This Matters": "No answer to a zone failure"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Time-dependent or order-dependent tests",
      "What the Issue Is": "Tests depend on the current time, on a sleep to let something finish, or on running in a particular order because they share fixture state. They pass on the author's machine and fail intermittently in CI. Once reruns become routine the suite stops being a trustworthy signal.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Flaky CI destroys the value of the quality gate"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing transaction in http request processing"
    }
  ],
  "Web UI": [
    {
      "Code Issue / Anti-Pattern Identified": "No loading, empty or error state for an async call",
      "What the Issue Is": "A component fires an asynchronous request and renders only the success case, with nothing shown while the request is in flight, nothing when the result is empty, and nothing when it fails. The user sees a blank region and cannot tell whether the app is working, finished, or broken. Every async call site needs all four states, and the missing ones are invisible in code review because the happy path reads complete.",
      "Topic / Framework(s)": "Web Vitals, Release It!, Nielsen Heuristics",
      "Area / Pillar": "UX Resilience",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "UI hangs or blanks when the API is slow"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Fetch without timeout or AbortController",
      "What the Issue Is": "A fetch or XHR is issued with no timeout and no AbortController, so it stays pending as long as the network or the server allows. On a poor mobile connection the spinner runs indefinitely. The browser will eventually give up, but on a timescale that has nothing to do with what the user will tolerate.",
      "Topic / Framework(s)": "Release It!, Google SRE",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "ESLint (custom rules), Semgrep",
      "Why This Matters": "Request hangs forever on a stalled network"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Request not cancelled on unmount or route change",
      "What the Issue Is": "A request started by a component is not cancelled when that component unmounts or the route changes, so its response arrives and writes into state that no longer exists or belongs to a different screen. The result is a warning at best and stale data rendered over the new page at worst. It also wastes bandwidth on results nobody will see.",
      "Topic / Framework(s)": "React/Frontend practice, Static Performance",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "eslint-plugin-react-hooks",
      "Why This Matters": "Stale response overwrites fresh state"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unbounded client-side retry",
      "What the Issue Is": "Client-side code retries a failed request in a loop with no attempt cap and no backoff, often inside an effect that re-runs on each failure. A single failing endpoint turns every open browser tab into a load generator. The server sees a coordinated attack pattern originating from its own users.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Browser tab becomes a load generator against your own API"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No error boundary around feature subtrees",
      "What the Issue Is": "The application has no error boundary around feature subtrees, so an exception thrown during render in any component unmounts the entire application tree. One broken widget takes the whole page to a blank screen. Scoping boundaries per feature would have degraded only the failing region.",
      "Topic / Framework(s)": "React/Frontend practice, Release It!",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One component crash blanks the whole app"
    },
    {
      "Code Issue / Anti-Pattern Identified": "API keys or secrets in the client bundle",
      "What the Issue Is": "An API key, secret or private token is referenced in client-side code or injected at build time into the bundle. Everything shipped to the browser is readable by anyone who opens developer tools, regardless of minification or obfuscation. Treating a build-time variable as private is the usual mistake.",
      "Topic / Framework(s)": "OWASP, Zero Trust, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Gitleaks, TruffleHog, Semgrep",
      "Why This Matters": "Anything shipped to the browser is public"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Auth token in localStorage rather than an httpOnly cookie",
      "What the Issue Is": "Session or access tokens are kept in localStorage or sessionStorage, which is readable by any JavaScript running on the origin, including third-party scripts and anything injected through XSS. An httpOnly, Secure, SameSite cookie is not readable by script at all. The choice determines whether one XSS becomes full account takeover.",
      "Topic / Framework(s)": "OWASP Top 10, Zero Trust",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "One XSS becomes full account takeover"
    },
    {
      "Code Issue / Anti-Pattern Identified": "innerHTML / dangerouslySetInnerHTML with untrusted data",
      "What the Issue Is": "Markup is built from data the application did not fully control and assigned through innerHTML, dangerouslySetInnerHTML or an equivalent, bypassing the framework's escaping. Any script, event handler or object tag in that data executes with the page's privileges. The data source is often assumed safe because it came from your own API.",
      "Topic / Framework(s)": "OWASP Top 10, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "ESLint, Semgrep, CodeQL",
      "Why This Matters": "Direct XSS vector"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No Content Security Policy, or an unsafe-inline one",
      "What the Issue Is": "The application ships without a Content-Security-Policy header, or with one that allows unsafe-inline and unsafe-eval, which removes most of the protection the policy exists to provide. CSP is the layer that limits the damage when an injection defect does get through. Without it a single injection has no containment.",
      "Topic / Framework(s)": "OWASP Top 10, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, CSP Evaluator",
      "Why This Matters": "Removes the last line of defence against XSS"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Third-party script from a CDN without pinning or SRI",
      "What the Issue Is": "A script is loaded from a third-party CDN by a URL that can change content, without subresource integrity and often without a pinned version. Whoever controls that host controls code running on your origin with full access to the DOM and cookies. Supply chain attacks on popular script hosts work exactly this way.",
      "Topic / Framework(s)": "SLSA, OWASP, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, Retire.js",
      "Why This Matters": "Supplier compromise runs code in your users' sessions"
    },
    {
      "Code Issue / Anti-Pattern Identified": "target=\"_blank\" without rel=\"noopener\"",
      "What the Issue Is": "A link opens in a new tab without rel=\"noopener\", so the destination page receives a reference to the opening window through window.opener and can navigate it elsewhere. The user returns to what looks like your site and is on someone else's. Modern browsers default to safe behaviour for some cases but not all.",
      "Topic / Framework(s)": "OWASP, MDN/W3C",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "eslint-plugin-react, Semgrep",
      "Why This Matters": "Reverse tabnabbing"
    },
    {
      "Code Issue / Anti-Pattern Identified": "postMessage or iframe messaging without origin check",
      "What the Issue Is": "A window.postMessage listener or an iframe integration processes incoming messages without checking the sender's origin, or posts to a wildcard target origin. Any page that can obtain a reference to the window can send messages that the handler treats as trusted. The handler is usually written as if only the intended partner exists.",
      "Topic / Framework(s)": "OWASP, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, CodeQL",
      "Why This Matters": "Any site can drive your app's message handler"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Validation only on the client",
      "What the Issue Is": "Input rules such as required fields, formats, ranges and business constraints are enforced only in the browser. Anyone can call the API directly and bypass all of them. Client-side validation is a user experience feature, and the server needs its own independent copy of every rule.",
      "Topic / Framework(s)": "OWASP Top 10, Zero Trust",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Client checks are advisory, the server is the boundary"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Form allows double submit with no idempotency",
      "What the Issue Is": "A submit button can be pressed repeatedly, or a slow request allows a second submission, and the request carries no idempotency key or client-generated identifier. Two identical operations reach the server and both succeed. For a payment, an order or a message this creates a duplicate the user did not intend.",
      "Topic / Framework(s)": "Release It!, Nielsen Heuristics",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Duplicate orders from an impatient click"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No bundle budget, no route-level code splitting",
      "What the Issue Is": "The build has no budget on bundle size and no route-level code splitting, so the first visit downloads and parses the whole application including code for pages the user may never open. Time to interactive is set by the largest feature in the codebase. Growth is gradual and nothing fails, so it is never noticed.",
      "Topic / Framework(s)": "Web Vitals, Lighthouse",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Lighthouse CI, bundlesize, source-map-explorer",
      "Why This Matters": "Slow first load on real devices and networks"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Images without responsive srcset, dimensions or lazy loading",
      "What the Issue Is": "Images are served at a single resolution with no srcset or sizes, without explicit width and height, and without loading=\"lazy\" for below-the-fold content. Mobile users download desktop-sized assets, and the missing dimensions cause layout shift as each image arrives. All three fixes are attributes on the existing tag.",
      "Topic / Framework(s)": "Web Vitals, Lighthouse",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Lighthouse CI, eslint-plugin-jsx-a11y",
      "Why This Matters": "Layout shift and wasted bandwidth"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Long list rendered without virtualisation",
      "What the Issue Is": "A list that can grow to hundreds or thousands of rows renders every item into the DOM at once. Memory, layout and scroll cost all scale with the data. The page is smooth with the seeded test data and unusable for the customer with real volume.",
      "Topic / Framework(s)": "Static Performance, Web Vitals",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Main thread blocks as data grows"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Expensive work in render, or re-render storms",
      "What the Issue Is": "Expensive computation, sorting, filtering or object construction runs inside the render path, or state is structured so that unrelated updates re-render large subtrees. The framework does the work again on every keystroke or every parent update. Profiling shows the cost, but reading the code does not.",
      "Topic / Framework(s)": "Static Performance, React practice",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "eslint-plugin-react-hooks, React Profiler",
      "Why This Matters": "Interaction latency that only shows on low-end hardware"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Array index used as list key",
      "What the Issue Is": "A list is rendered with the array index as the key, so when items are inserted, removed or reordered the framework reuses the wrong DOM nodes and component state. Checkboxes tick on the wrong row and inputs keep the previous item's value. The bug looks like a data problem and is a reconciliation problem.",
      "Topic / Framework(s)": "React/Frontend practice",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "eslint-plugin-react",
      "Why This Matters": "Wrong rows reused, input state jumps between items"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Listeners, timers or subscriptions never cleaned up",
      "What the Issue Is": "Event listeners, intervals, timeouts, observers or subscriptions are created in a component and never removed when it unmounts. Each mount adds another live handler over the same target. Memory grows, handlers fire multiple times, and the page degrades the longer the session lasts.",
      "Topic / Framework(s)": "Static Performance, React practice",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "ESLint, Chrome DevTools",
      "Why This Matters": "Memory growth over a long session"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Non-semantic clickable elements, no keyboard path",
      "What the Issue Is": "A div or span is given a click handler to act as a button or link, without a button element, a role, a tabindex or a key handler. Keyboard users cannot reach or activate it and screen readers do not announce it as interactive. Visually it is indistinguishable from a working control.",
      "Topic / Framework(s)": "WCAG 2.2, ARIA APG",
      "Area / Pillar": "Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "axe-core, eslint-plugin-jsx-a11y, Pa11y",
      "Why This Matters": "Legal exposure and unusable for keyboard users"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing labels, alt text or accessible names",
      "What the Issue Is": "Form controls have no associated label, images have no alt text, and icon-only buttons have no accessible name. Assistive technology announces them as unlabelled, so the user is told there is a control but not what it does. Every one of these is a single attribute.",
      "Topic / Framework(s)": "WCAG 2.2",
      "Area / Pillar": "Accessibility",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "axe-core, Lighthouse, Pa11y",
      "Why This Matters": "Screen readers cannot describe the interface"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No focus management on route change or modal open",
      "What the Issue Is": "After a client-side route change or a modal opening, focus stays where it was rather than moving to the new content, and on close it is not returned to the trigger. Keyboard and screen reader users are left in the previous context with no indication anything changed. Focus is the only position indicator those users have.",
      "Topic / Framework(s)": "WCAG 2.2, ARIA APG",
      "Area / Pillar": "Accessibility",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "axe-core (partial)",
      "Why This Matters": "Focus lost, keyboard users stranded behind a dialog"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Async updates without aria-live",
      "What the Issue Is": "Content that updates asynchronously, such as search results, validation errors, toasts or counters, is inserted without an aria-live region. Sighted users see the change and assistive technology users are told nothing. The update is real and, for those users, silent.",
      "Topic / Framework(s)": "WCAG 2.2, ARIA APG",
      "Area / Pillar": "Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "axe-core (partial)",
      "Why This Matters": "Screen reader users never learn the result of their action"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Insufficient colour contrast, or colour as the only signal",
      "What the Issue Is": "Text or interface elements fall below the WCAG contrast ratio, or a state such as error, required or selected is signalled by colour alone with no icon, text or shape. Users with low vision or colour vision deficiency cannot read or distinguish it. Disabled, placeholder and secondary text are the usual offenders.",
      "Topic / Framework(s)": "WCAG 2.2",
      "Area / Pillar": "Accessibility",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "axe-core, Lighthouse",
      "Why This Matters": "Fails the most common audit finding"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hardcoded user-facing strings, dates, numbers or currency",
      "What the Issue Is": "User-facing strings are written inline in components, and dates, numbers and currency are formatted with hand-rolled logic or hardcoded symbols. Adding a language means finding every literal across the codebase. Formatting also stays wrong for users whose locale conventions differ.",
      "Topic / Framework(s)": "i18n practice, Twelve-Factor App",
      "Area / Pillar": "Localisation",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "eslint-plugin-i18next",
      "Why This Matters": "Locale rollout becomes a rewrite"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hardcoded API base URL or environment branching in client code",
      "What the Issue Is": "The API base URL is hardcoded, or the client inspects the hostname to decide which backend to call. The same build cannot be promoted between environments. It is also common for the branch to point a preview environment at production data.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Same bundle cannot be promoted across environments"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No client-side error tracking or unhandled rejection handler",
      "What the Issue Is": "There is no global error handler, no unhandled promise rejection handler and no client-side error reporting. Errors that happen in the browser leave no trace on the server. The team's view of reliability is limited to what the backend can see, which excludes most of what users experience.",
      "Topic / Framework(s)": "Observability, Google SRE",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Front-end failures are invisible to the team"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No Real User Monitoring of Web Vitals",
      "What the Issue Is": "There is no field measurement of Largest Contentful Paint, Interaction to Next Paint or Cumulative Layout Shift from real sessions, only lab tests run on developer hardware. Actual performance on mid-range phones and slow networks is unknown. Regressions ship without anyone noticing.",
      "Topic / Framework(s)": "Observability, Web Vitals",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "web-vitals, Lighthouse CI",
      "Why This Matters": "Lab scores hide what users experience"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Correlation ID not propagated from browser to backend",
      "What the Issue Is": "The browser does not generate or forward a request identifier that the backend also records, so a user-reported failure cannot be joined to the server-side trace of that same request. Each side has half the story. Diagnosis becomes a search through timestamps.",
      "Topic / Framework(s)": "Observability, CNCF Cloud Native",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Cannot trace a user complaint to a server request"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No client feature flag or kill switch",
      "What the Issue Is": "Front-end features have no runtime toggle, so disabling a broken one requires building and deploying a new bundle and waiting for caches to turn over. Recovery time is set by the release pipeline. The backend often has flags while the client does not.",
      "Topic / Framework(s)": "Config Mgmt, DORA, Release It!",
      "Area / Pillar": "Operability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A broken UI feature needs a full redeploy to disable"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Long-cached HTML or no cache-busting on assets",
      "What the Issue Is": "The HTML document is served with a long cache lifetime, or static assets are served without content hashes in their filenames. Returning users are pinned to an old bundle, or receive a new HTML document that references assets that no longer exist. The result is a broken page that a hard refresh fixes, which most users will not do.",
      "Topic / Framework(s)": "Web Vitals, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Lighthouse CI",
      "Why This Matters": "Users stay on a stale build after deploy"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Client assumes a single API version, no tolerance for change",
      "What the Issue Is": "The client is written against exactly the response shape it sees today, breaking on an added field, a reordered array or a nullable value. Backend teams cannot make additive changes safely. The coupling is invisible until a deploy on the other side breaks the front end.",
      "Topic / Framework(s)": "Release It!, CI/CD",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Backend deploy breaks open browser sessions"
    },
    {
      "Code Issue / Anti-Pattern Identified": "PII placed in localStorage, URLs or analytics payloads",
      "What the Issue Is": "Personal data is written into localStorage, embedded in URLs where it lands in browser history, referrer headers and server logs, or included in analytics payloads sent to third parties. Each of these locations is outside the application's access controls and retention policy. Query strings in particular travel much further than developers expect.",
      "Topic / Framework(s)": "Privacy/GDPR, OWASP",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Regulatory exposure through third-party tags"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Third-party tags loaded before consent",
      "What the Issue Is": "Analytics, advertising or session-recording tags are loaded on page load, before the user has made a consent choice or after they have declined. The data collection has already happened by the time the banner is answered. This is one of the most commonly enforced privacy failures.",
      "Topic / Framework(s)": "Privacy/GDPR",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Consent framework exists but is bypassed in code"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No offline or network-failure handling",
      "What the Issue Is": "The application assumes connectivity and has no handling for a failed or interrupted request beyond a generic error, no queued retry when connectivity returns, and no indication of offline state. Users on mobile networks hit this constantly. Work in progress is usually lost.",
      "Topic / Framework(s)": "Release It!, PWA practice",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Flaky connectivity looks like a broken product"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Fixed pixel width or height on a layout container",
      "What the Issue Is": "A layout container, column or panel is given a width or height in fixed pixels rather than a relative or content-driven size. It cannot adapt when the viewport, the font size or the content changes. Nothing errors, so the breakage is only visible by opening the page at a size nobody tested.",
      "Topic / Framework(s)": "Responsive Web Design, WCAG 2.2 Reflow",
      "Area / Pillar": "Responsive",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Stylelint, ESLint style rules",
      "Why This Matters": "The layout survives the designer's viewport and breaks on every other one, and the failure is silent because nothing errors."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Breakpoint values repeated as literals instead of shared tokens",
      "What the Issue Is": "Breakpoint values such as 768px or 1024px are written as literals in many stylesheets and components rather than defined once and referenced. Over time the values diverge by a few pixels. Components then change layout at slightly different widths and the grid tears in a narrow band that is hard to reproduce.",
      "Topic / Framework(s)": "Design Systems, Responsive Web Design",
      "Area / Pillar": "Responsive, Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Stylelint custom rules",
      "Why This Matters": "Breakpoints drift apart across files, so components change shape at different widths and the grid tears."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Horizontal overflow on the page body at small viewports",
      "What the Issue Is": "At small viewport widths the page content is wider than the viewport, so the whole body scrolls sideways. The usual causes are a fixed-width element, an unwrapped long string, or negative margins. WCAG treats this as a reflow failure, not a cosmetic one, because content moves out of reach.",
      "Topic / Framework(s)": "WCAG 2.2 Reflow (1.4.10), Web Vitals",
      "Area / Pillar": "Responsive, Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Lighthouse CI, Playwright viewport assertions",
      "Why This Matters": "Content is unreachable on a phone, and it is a WCAG failure rather than a cosmetic one."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Wide content such as tables, code or diagrams with no contained scroll",
      "What the Issue Is": "Wide content such as a data table, a code block or a diagram is placed directly in the page flow without its own horizontally scrollable container. Rather than scrolling inside its own box, it pushes the entire page wider. Fixing it requires understanding the element's position in the layout, not just its own styles.",
      "Topic / Framework(s)": "WCAG 2.2 Reflow, Responsive Web Design",
      "Area / Pillar": "Responsive",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One wide element forces the whole page to scroll sideways, which needs reasoning about the element inside its layout context."
    },
    {
      "Code Issue / Anti-Pattern Identified": "100vh used where mobile browser chrome changes the viewport height",
      "What the Issue Is": "Full-viewport-height layouts use the vh unit, which on mobile browsers is calculated against the largest viewport including the area the address bar occupies. As the browser chrome hides and shows during scroll the layout jumps or gets clipped. The dynamic viewport units exist specifically to address this.",
      "Topic / Framework(s)": "Responsive Web Design, Web Vitals",
      "Area / Pillar": "Responsive",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Stylelint custom rules",
      "Why This Matters": "The layout jumps as the address bar hides and shows, and it only reproduces on a real device."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Media queries used where a reusable component needs container queries",
      "What the Issue Is": "A component's responsive behaviour is driven by the viewport width through media queries, even though the component can be placed in a sidebar, a modal or a grid cell. It adapts to the window rather than to the space it was actually given. Reusing it in a narrower container produces a desktop layout in a small box.",
      "Topic / Framework(s)": "Responsive Web Design, Design Systems",
      "Area / Pillar": "Responsive",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The component adapts to the window rather than to the space it was given, so it breaks when reused in a sidebar."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Desktop and mobile rendered by two divergent component trees",
      "What the Issue Is": "Rather than one component tree that adapts, the application maintains separate mobile and desktop implementations of the same screens, selected by a viewport check. Every feature, fix and content change has to be made twice. In practice the less-visited variant drifts behind and accumulates its own defects.",
      "Topic / Framework(s)": "Responsive Web Design, Design Systems",
      "Area / Pillar": "Responsive, Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every feature has to be built twice, and one of the two copies silently falls behind."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hover-only interaction with no touch or keyboard equivalent",
      "What the Issue Is": "Behaviour that only appears on hover, such as a tooltip, a menu or a set of row actions, has no touch or keyboard equivalent. On a touch device the interaction either does nothing or requires a stray tap that users do not discover. The handler exists, so the code looks complete.",
      "Topic / Framework(s)": "WCAG 2.2, Apple HIG, Material Design",
      "Area / Pillar": "Responsive, Accessibility",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "eslint-plugin-jsx-a11y (partial)",
      "Why This Matters": "The feature is invisible on touch devices, and the code reads as complete because the handler exists."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Touch target smaller than the platform minimum",
      "What the Issue Is": "Buttons, links and other interactive targets are smaller than the platform minimum of roughly 44 by 44 CSS pixels, or are packed closely enough that adjacent targets overlap. Users mis-tap, and users with reduced motor control cannot use the control at all. Icon-only buttons and table row actions are the usual cases.",
      "Topic / Framework(s)": "WCAG 2.2 (2.5.8), Apple HIG, Material Design",
      "Area / Pillar": "Responsive, Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "axe-core, Lighthouse CI",
      "Why This Matters": "Interactive elements become unusable on a phone for anyone without precise motor control."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Font size or spacing in px, ignoring the user's browser text-size setting",
      "What the Issue Is": "Font sizes, line heights and container heights are set in px rather than rem or em, so they do not respond to the user's browser font size setting. A user who has enlarged text sees no change. The setting exists for accessibility and is silently overridden.",
      "Topic / Framework(s)": "WCAG 2.2 (1.4.4), Responsive Web Design",
      "Area / Pillar": "Accessibility, Responsive",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Stylelint custom rules",
      "Why This Matters": "Users who enlarge text get no change, and the accessibility setting they rely on does nothing."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Safe-area insets ignored on notched or rounded displays",
      "What the Issue Is": "The layout does not account for the safe-area insets on devices with a notch, rounded corners or a home indicator, so content is placed under system chrome. It affects a subset of devices, typically in landscape or in full-bleed layouts. Desktop testing never reveals it.",
      "Topic / Framework(s)": "Apple HIG, Responsive Web Design",
      "Area / Pillar": "Responsive",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Content sits under the notch or the home indicator on a subset of devices nobody tested on."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Media, embeds or iframes without a max-width or aspect-ratio constraint",
      "What the Issue Is": "Images, video, embeds or iframes are inserted without max-width: 100%, an aspect ratio, or explicit dimensions. They overflow their container and cause layout shift as they load. Both problems are addressed by attributes and rules that linters and Lighthouse already report.",
      "Topic / Framework(s)": "Responsive Web Design, Web Vitals",
      "Area / Pillar": "Responsive, Performance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Stylelint, Lighthouse CI",
      "Why This Matters": "The element escapes the grid and causes layout shift, and linters and Lighthouse both flag it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Layout depends on JavaScript-measured dimensions rather than CSS",
      "What the Issue Is": "Layout decisions are made by measuring elements in JavaScript and applying sizes or positions from script, rather than expressing them in CSS. The measurement runs after the first paint, so the user sees the wrong layout momentarily. Resize, zoom, print and server-side rendering all behave incorrectly.",
      "Topic / Framework(s)": "Responsive Web Design, Web Vitals",
      "Area / Pillar": "Responsive, Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Resize, zoom and print all break, and the measurement runs after paint so the user sees the wrong layout first."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No print or reduced-width stylesheet for a document-style page",
      "What the Issue Is": "A page whose content users will print or export to PDF, such as an invoice, report or article, has no print stylesheet, so navigation, sidebars and interactive controls appear in the output and content is cut off at page boundaries. Users discover it at the moment they need the document.",
      "Topic / Framework(s)": "Responsive Web Design, WCAG 2.2",
      "Area / Pillar": "Responsive",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Printing or exporting produces an unusable page, which users only discover at the point they need it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "View state that belongs in the URL kept in component state",
      "What the Issue Is": "State that determines what the user is looking at, such as the active filter, the selected tab, the search term, the sort order or the page number, is held in component state instead of the URL. The view cannot be bookmarked, shared or restored after a refresh, and the back button does not move between these states. Finding every instance means reading the component tree rather than a route file.",
      "Topic / Framework(s)": "Web platform routing conventions, REST",
      "Area / Pillar": "Routing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Filters, tabs, search and pagination cannot be shared, bookmarked or reloaded, and finding every instance means reading the component tree."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Navigation performed by pushing history state with no matching route",
      "What the Issue Is": "Code calls history.pushState or an equivalent to record a navigation without a corresponding route entry that can render that URL. Going back or reloading lands on a path the router does not recognise. The result is a blank page that looks like a crash.",
      "Topic / Framework(s)": "Web platform routing conventions",
      "Area / Pillar": "Routing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The back button lands on a URL the router cannot render, which reads as a random blank page."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Modal, drawer or wizard step opened without a history entry",
      "What the Issue Is": "A modal, drawer, filter panel or wizard step is opened purely by setting component state, with no history entry. Pressing back, which is what users do to dismiss an overlay especially on mobile, navigates away from the whole page instead. This is the most frequently reported navigation complaint in web applications.",
      "Topic / Framework(s)": "Web platform routing conventions, Apple HIG",
      "Area / Pillar": "Routing, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Back dismisses the whole page instead of the overlay, which is the single most common navigation complaint in a web app."
    },
    {
      "Code Issue / Anti-Pattern Identified": "push and replace used inconsistently for the same class of navigation",
      "What the Issue Is": "Navigations of the same kind are sometimes performed with push and sometimes with replace, so history behaves differently in different flows. Back traverses intermediate states in one place and skips them in another. The inconsistency only becomes visible when the flows are compared side by side.",
      "Topic / Framework(s)": "Web platform routing conventions",
      "Area / Pillar": "Routing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Back traverses intermediate states in some flows and skips them in others, and the inconsistency is only visible across files."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Deep link restores the route but not the full view state",
      "What the Issue Is": "Opening a shared URL restores the route but not the rest of what the sender was seeing, such as expanded sections, scroll position, selected item or applied filters, because only part of the view state is encoded in the URL. The recipient sees something different from what was described to them.",
      "Topic / Framework(s)": "Web platform routing conventions",
      "Area / Pillar": "Routing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A shared or bookmarked link opens something different from what the sender saw."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Query parameter names, casing or encoding inconsistent across routes",
      "What the Issue Is": "Different routes name the same concept differently, encode arrays and dates in different ways, or vary in casing. Every piece of code that reads or builds URLs has to handle each variant. The URL stops being a usable interface for links, analytics and integrations.",
      "Topic / Framework(s)": "Web platform routing conventions, REST",
      "Area / Pillar": "Routing, Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every consumer needs a special case, and the URLs stop being a usable interface."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Scroll position not restored on back navigation",
      "What the Issue Is": "After navigating away from a long scrollable list and coming back, the page is at the top rather than at the item the user left from. Browsers restore scroll for full page loads but client-side routers must implement it. Browse-and-return flows become unusable at any real list length.",
      "Topic / Framework(s)": "Web platform routing conventions, Web Vitals",
      "Area / Pillar": "Routing, Usability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Returning to a long list drops the user at the top, which makes browse-and-return flows unusable."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Redirect after authentication loses the originally requested URL",
      "What the Issue Is": "When an unauthenticated user opens a protected URL they are sent to login, and after authenticating they are sent to a default landing page rather than to the URL they asked for. Every deep link from email, chat or search loses its destination. The original path was available and was not captured.",
      "Topic / Framework(s)": "OWASP, routing conventions",
      "Area / Pillar": "Routing, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every deep link a logged-out user opens sends them to the dashboard instead."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Route change does not reset transient state such as form input, errors or focus",
      "What the Issue Is": "Moving to a new route leaves behind state from the previous one, such as form input, validation errors, a loading flag, a selected row or focus position. The next screen renders with data that belongs to a different context. It looks like a data bug rather than a lifecycle bug.",
      "Topic / Framework(s)": "Web platform routing conventions",
      "Area / Pillar": "Routing, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "State from the previous screen bleeds into the next one, and the bug looks like data corruption."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Route-level data fetched inside a component effect rather than declared on the route",
      "What the Issue Is": "Data for a route is requested from inside a component effect after that component mounts, rather than declared as part of the route definition. Fetching cannot begin until render, which serialises navigation and data loading. It also prevents the router from preloading data on hover or during a transition.",
      "Topic / Framework(s)": "Web platform routing conventions, Web Vitals",
      "Area / Pillar": "Routing, Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Fetching cannot start until render, which serialises the waterfall and blocks preloading and prefetching."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Trailing slash, casing or locale prefix inconsistency producing duplicate URLs",
      "What the Issue Is": "The same content is reachable at paths that differ by a trailing slash, letter case or the presence of a locale prefix, and none of them redirect to a canonical form. Caching, analytics and search indexing treat them as different pages. Metrics for a single page arrive split across several rows.",
      "Topic / Framework(s)": "REST, SEO conventions",
      "Area / Pillar": "Routing",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Lighthouse CI, link checkers",
      "Why This Matters": "The same page exists at several addresses, splitting caching, analytics and search ranking."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No catch-all route, so unknown paths render a blank shell",
      "What the Issue Is": "The router has no fallback route, so a path that matches nothing renders an empty layout shell rather than a not-found page. Typos, stale links and removed content all produce what looks like a broken application. The user is given no explanation and no way forward.",
      "Topic / Framework(s)": "Web platform routing conventions",
      "Area / Pillar": "Routing, Resilience",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Route configuration review",
      "Why This Matters": "A typo or a stale link produces a page that looks broken rather than one that explains itself."
    },
    {
      "Code Issue / Anti-Pattern Identified": "URL rewritten on every keystroke, flooding the history stack",
      "What the Issue Is": "An input bound to a URL query parameter writes to the router on every keystroke, creating a history entry per character. The back button then has to be pressed once per letter typed to leave the page. It also triggers a router update and often a refetch on each keypress.",
      "Topic / Framework(s)": "Web platform routing conventions",
      "Area / Pillar": "Routing, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Back has to be pressed once per character typed, which effectively removes the back button."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Router state and application state kept as two sources of truth",
      "What the Issue Is": "The router's location and an application store both hold a copy of what the current view should be, kept in sync manually. They diverge after a browser back, an external deep link or a redirect, because only one of the two is updated by the browser. Reconciling them requires reading both.",
      "Topic / Framework(s)": "Web platform routing conventions, Clean Architecture",
      "Area / Pillar": "Routing, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The two disagree after any external navigation, and reconciling them needs reading both stores together."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Client-side navigation used for links that should be real anchors",
      "What the Issue Is": "Internal navigation is attached to a div or a button with an onClick handler that calls the router, instead of an anchor element with an href. Middle-click, open in new tab, copy link address and crawler discovery all stop working, and assistive technology does not announce it as a link. Wrapping the router call in a real anchor preserves both behaviours.",
      "Topic / Framework(s)": "WCAG 2.2, SEO conventions, HTML semantics",
      "Area / Pillar": "Routing, Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "eslint-plugin-jsx-a11y, axe-core",
      "Why This Matters": "Open in new tab, middle click and crawlers all stop working, and screen readers lose the link role."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Colours written as hex or rgb literals rather than design tokens",
      "What the Issue Is": "Colour values are written as hex, rgb or named literals throughout stylesheets and components, rather than referencing a small set of named tokens or CSS custom properties. Introducing a second theme means locating and reasoning about every literal. What should be a token swap becomes a codebase-wide edit.",
      "Topic / Framework(s)": "Design Systems, WCAG 2.2",
      "Area / Pillar": "Theming, Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Stylelint colour rules",
      "Why This Matters": "Any theme change requires finding every literal, so dark mode becomes a rewrite rather than a token swap."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Dark mode applied to some components only",
      "What the Issue Is": "Dark mode is implemented for the main layout and the most-used screens, but individual components, error states, empty states, disabled controls and rarely visited pages retain light-mode styling. Those areas render unreadably, typically dark text on a dark ground. No stylesheet reveals which components were missed.",
      "Topic / Framework(s)": "Design Systems, WCAG 2.2",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Unthemed components render dark text on dark ground, and finding them means auditing the whole component set."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Theme resolved only from prefers-color-scheme, with no explicit user override",
      "What the Issue Is": "The application resolves the theme purely from the prefers-color-scheme media query and offers no in-app control. Users who want the site in a different mode from their operating system, which is common for reading-heavy or image-heavy pages, have no way to express it. The preference is also not portable across their devices.",
      "Topic / Framework(s)": "WCAG 2.2, platform conventions",
      "Area / Pillar": "Theming, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Users who want the app in a different mode from their operating system have no way to say so."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Explicit theme choice not persisted or not applied before first paint",
      "What the Issue Is": "An explicit theme choice is either not persisted, so it resets on every visit, or it is persisted but applied by JavaScript after the framework has hydrated. In the second case the page paints in the default theme first and then switches, producing a visible flash on every load. Avoiding it requires setting the theme before first paint, typically with a small inline script.",
      "Topic / Framework(s)": "Web Vitals, Design Systems",
      "Area / Pillar": "Theming, Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The page flashes the wrong theme on every load, and the fix has to happen before the framework hydrates."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Theme defined only inside a media query or a data attribute, never on the base selector",
      "What the Issue Is": "A colour or theme value is defined only inside a prefers-color-scheme media query or only under a data-theme attribute, with nothing on the base selector. There are three states to cover: explicit light, explicit dark and system default with no attribute set. Defining only two leaves one state with no value at all.",
      "Topic / Framework(s)": "Design Systems, CSS architecture",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Stylelint custom rules",
      "Why This Matters": "One of the three states, system default, explicit light and explicit dark, ends up with no definition at all."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Images, illustrations, charts or iframes not theme-aware",
      "What the Issue Is": "Illustrations, screenshots, logos, chart palettes and embedded iframes are authored for a light background and reused unchanged in dark mode. They appear as bright rectangles on a dark page, and chart text can become unreadable. No CSS rule can identify which assets have this problem.",
      "Topic / Framework(s)": "Design Systems, WCAG 2.2",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "White-background assets punch holes in a dark page, and no CSS rule reveals which assets those are."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Contrast verified in light mode only",
      "What the Issue Is": "Colour contrast is checked against the light palette only, and the dark palette is derived by adjusting values until it looks acceptable. Secondary text, placeholder text, disabled states and borders commonly fall below the required ratio in dark mode. The states least likely to be reviewed are the ones that fail.",
      "Topic / Framework(s)": "WCAG 2.2 (1.4.3), Design Systems",
      "Area / Pillar": "Theming, Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "axe-core, Pa11y, contrast checkers",
      "Why This Matters": "The dark palette fails contrast on exactly the states nobody screenshot, such as disabled and placeholder text."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Elevation and shadow reused unchanged in dark mode instead of remapped",
      "What the Issue Is": "Depth in the light theme is conveyed by drop shadows, which are effectively invisible against a dark background. Dark themes convey elevation by lightening the surface instead. Reusing the light shadow values flattens the interface and removes the cues that separate layers.",
      "Topic / Framework(s)": "Material Design, Design Systems",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Shadows are invisible on a dark ground, so the depth cues the layout relies on disappear."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Theme state duplicated across a CSS class and a JavaScript variable",
      "What the Issue Is": "The active theme is tracked both as a class or attribute on the document element and as a value in application state, updated in two places. After a route change, a rehydration or an external change the two disagree, so some components style themselves from one source and some from the other. The page ends up partially themed.",
      "Topic / Framework(s)": "Design Systems, Clean Architecture",
      "Area / Pillar": "Theming, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The two drift after a route change or a rehydration, and components disagree about which theme is active."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Third-party or embedded widget locked to a single theme",
      "What the Issue Is": "An embedded third-party component such as a payment field, a map, a chat widget or a video player renders in its own fixed theme with no configuration hook. It stays bright inside a dark page. The constraint sits outside your codebase, so it needs a design decision rather than a code fix.",
      "Topic / Framework(s)": "Design Systems",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One embedded component stays bright on a dark page and there is no styling hook to fix it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "prefers-reduced-motion, prefers-contrast or forced-colors ignored",
      "What the Issue Is": "The application animates, uses high-saturation colour combinations, or relies on system colour choices without honouring prefers-reduced-motion, prefers-contrast or forced-colors. Users set these for vestibular disorders, low vision and other medical reasons. The preference is expressed by the platform and ignored by the page.",
      "Topic / Framework(s)": "WCAG 2.2 (2.3.3), Design Systems",
      "Area / Pillar": "Accessibility, Theming",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "axe-core, Stylelint custom rules",
      "Why This Matters": "Users who set these preferences for medical reasons get the animation anyway."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Spacing, radius, shadow or z-index values assigned ad hoc rather than from a scale",
      "What the Issue Is": "Margins, padding, corner radii, shadows and z-index values are chosen per component rather than drawn from a defined scale. Spacing drifts by a few pixels between screens and stacking order becomes a matter of escalating numbers. The individual values all look reasonable; only the aggregate is wrong.",
      "Topic / Framework(s)": "Design Systems",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Stylelint custom rules",
      "Why This Matters": "Visual rhythm degrades gradually and stacking conflicts appear that no single file explains."
    },
    {
      "Code Issue / Anti-Pattern Identified": "The same UI element implemented several times with divergent behaviour",
      "What the Issue Is": "The same interface element, such as a date picker, a confirmation dialog or a status badge, exists in several independent implementations across the codebase because each was built where it was needed. Their behaviour, accessibility and styling diverge. Detecting this requires comparing what components do, not just how their code looks.",
      "Topic / Framework(s)": "Design Systems, Clean Architecture",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "jscpd (partial)",
      "Why This Matters": "A fix lands on one copy, and detecting the others requires comparing markup and behaviour rather than text."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Loading, empty and error presentation inconsistent across screens",
      "What the Issue Is": "Loading indicators, empty states and error messages are designed per screen, so one page shows a spinner, another a skeleton and a third nothing at all, and errors appear variously as toasts, inline text or full-page replacements. The user has to learn each screen separately. The inconsistency is only apparent when screens are viewed together.",
      "Topic / Framework(s)": "Design Systems, UX Resilience",
      "Area / Pillar": "Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The application feels like several products, and each screen teaches the user a different pattern."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Date, number and currency formatting done inconsistently across components",
      "What the Issue Is": "Dates, numbers, percentages and currency values are formatted at each call site with ad hoc logic rather than through shared formatters. The same underlying value is displayed differently on different screens. Locale correctness also has to be fixed in every place independently.",
      "Topic / Framework(s)": "Localisation, Design Systems",
      "Area / Pillar": "Localisation, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "eslint-plugin-format-message (partial)",
      "Why This Matters": "The same value is displayed differently on two screens, and only a cross-file read finds every formatter."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Infinite API call loop bug",
      "What the Issue Is": "Conditions in which the application goes into a redirect or server call loop"
    }
  ],
  "Mobile App": [
    {
      "Code Issue / Anti-Pattern Identified": "No forced-update or remote kill switch",
      "What the Issue Is": "There is no server-controlled way to require users on an old build to update, and no remote switch to disable a broken feature. Mobile releases go through store review and users update on their own schedule, so a bad build can stay in the field for weeks. Without these controls the only remedy is another release that most affected users will not install promptly.",
      "Topic / Framework(s)": "Release It!, DORA, Store policy",
      "Area / Pillar": "Operability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A bad build cannot be rolled back once users have it"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No staged rollout or remote config",
      "What the Issue Is": "Every release goes to all users at once, with no percentage rollout, no halt mechanism and no server-side configuration that can change behaviour without a new binary. A defect that only appears at scale reaches the entire install base before it is detected. Store rollout halts help, but only for users who have not already updated.",
      "Topic / Framework(s)": "DORA, CI/CD, Store policy",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every release is all-or-nothing"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Client assumes the backend never changes shape",
      "What the Issue Is": "The client parses responses assuming exactly the current field set and types, so an added field, a null where a value was expected, or a new enum value causes a crash or a wrong render. Unlike a web client, old app versions stay in the field indefinitely. The backend therefore cannot make changes that the oldest supported build cannot tolerate.",
      "Topic / Framework(s)": "Release It!, CI/CD",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Old app versions live for years and must keep working"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No offline mode or outbound request queue",
      "What the Issue Is": "The app assumes connectivity, so actions taken without a network are lost rather than queued, and cached content is not available. Mobile users move through tunnels, lifts and dead zones constantly. Work the user believed was saved disappears with no notification.",
      "Topic / Framework(s)": "OWASP MASVS, Android Core App Quality",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Mobile networks fail constantly, the app must not"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Retry without backoff or jitter on mobile networks",
      "What the Issue Is": "Failed requests are retried with a fixed interval or without random jitter, on networks that fail in correlated ways such as a cell handover or a captive portal. Every affected device retries in step. The backend receives a synchronised wave from the entire fleet at the moment it recovers.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Battery drain and retry storms on reconnect"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Network or disk I/O on the main thread",
      "What the Issue Is": "Network requests, database queries, file reads, JSON parsing or image decoding are performed on the UI thread. The interface stops responding to touch for the duration. On Android this produces an Application Not Responding dialog, and on iOS the watchdog can terminate the app outright.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Android Lint, StrictMode, SwiftLint",
      "Why This Matters": "ANRs and watchdog terminations"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Heavy work in view lifecycle causing jank",
      "What the Issue Is": "Expensive work such as layout calculation, data transformation or allocation is placed in a view lifecycle callback or a scroll or draw handler that runs every frame. The frame budget of roughly sixteen milliseconds is exceeded and the interface stutters. Users perceive this as the app being cheap rather than as a bug.",
      "Topic / Framework(s)": "Android Vitals, Apple HIG",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint, Instruments, Perfetto",
      "Why This Matters": "Dropped frames on the devices most users own"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Activity, context or view controller retained past its lifecycle",
      "What the Issue Is": "A reference to an activity, context, view controller or view is held by something that outlives it, such as a static field, a singleton, a long-running callback or an unregistered listener. The screen and everything it holds cannot be garbage collected. Memory grows with each navigation until the app is terminated.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "LeakCanary, Android Lint, Instruments",
      "Why This Matters": "Memory leaks that end in OOM kills"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Full-resolution image decoding without downsampling",
      "What the Issue Is": "A full-resolution image, often several megapixels from a camera or a server, is decoded into memory to display in a small view without downsampling. Memory use is driven by the source dimensions rather than the display size. On lower-memory devices this is a direct cause of out-of-memory termination.",
      "Topic / Framework(s)": "Static Performance, Android Vitals",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint",
      "Why This Matters": "OOM crashes on low-memory devices"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unbounded on-device cache or database growth",
      "What the Issue Is": "A local database, image cache, log file or downloaded content store grows with no size cap, no eviction policy and no cleanup. It consumes the user's device storage indefinitely. Users notice through the system storage settings and respond by uninstalling.",
      "Topic / Framework(s)": "Release It!, Android Core App Quality",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "App consumes device storage and gets uninstalled"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Background sync, wake lock or foreground service held too long",
      "What the Issue Is": "A background sync, wake lock, foreground service or location subscription is started but held longer than the work requires, or is never released on all exit paths. The device cannot enter a low-power state. Battery drain is attributed to the app by the operating system and shown to the user by name.",
      "Topic / Framework(s)": "Android Vitals, Apple HIG",
      "Area / Pillar": "Battery, Cost",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint",
      "Why This Matters": "Battery complaints and OS-level throttling"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Process death and state restoration not handled",
      "What the Issue Is": "On Android the system can terminate a backgrounded process and later recreate the activity, and iOS behaves similarly on memory pressure. If transient state is held only in memory and not saved and restored, the user returns to a reset screen. It is not reproducible in normal testing because it requires the process to actually be killed.",
      "Topic / Framework(s)": "Android Core App Quality",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Android Lint (partial)",
      "Why This Matters": "User returns to a blank or reset screen"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Secrets or API keys in the binary, strings.xml or Info.plist",
      "What the Issue Is": "API keys, tokens or credentials are compiled into the binary or placed in resource files such as strings.xml, Info.plist or a bundled configuration. Extracting them from a distributed app requires only standard tooling. Anything shipped to a device is public.",
      "Topic / Framework(s)": "OWASP MASVS, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "MobSF, Gitleaks, Semgrep",
      "Why This Matters": "Trivially extracted from any published app"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Tokens in SharedPreferences or UserDefaults instead of Keystore/Keychain",
      "What the Issue Is": "Authentication tokens or other sensitive values are stored in SharedPreferences or UserDefaults, which are plain files in the app sandbox, rather than in the platform Keystore or Keychain. On a rooted or jailbroken device, or through a backup, they are readable. The platform provides hardware-backed storage precisely for this data.",
      "Topic / Framework(s)": "OWASP MASVS",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "MobSF, Semgrep",
      "Why This Matters": "Credentials readable on a rooted or backed-up device"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unencrypted local database holding sensitive data",
      "What the Issue Is": "A local SQLite or Realm database holding personal, financial or health data is stored without encryption. The app sandbox is the only protection, and it does not survive device compromise, backup extraction or forensic tooling. Encrypted database variants exist and are close to drop-in.",
      "Topic / Framework(s)": "OWASP MASVS, Privacy/GDPR",
      "Area / Pillar": "Security, Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "MobSF",
      "Why This Matters": "Device loss becomes a data breach"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Exported activity, service or receiver without permission",
      "What the Issue Is": "An Android activity, service, broadcast receiver or content provider is marked exported, or is implicitly exported by declaring an intent filter, without a permission requirement or a signature check. Any other app on the device can invoke it. Components intended for internal use become a public interface.",
      "Topic / Framework(s)": "OWASP MASVS, Android security",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "MobSF, Android Lint",
      "Why This Matters": "Any installed app can invoke your components"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Deep link or custom URL scheme accepted without validation",
      "What the Issue Is": "The app registers a deep link or custom URL scheme and acts on the parameters without validating them or checking that the caller is allowed to trigger that action. Any web page or installed app can construct such a link. Handlers commonly perform navigation, authentication or state changes on trust.",
      "Topic / Framework(s)": "OWASP MASVS, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "MobSF, Semgrep",
      "Why This Matters": "Link hijacking and unauthorised in-app navigation"
    },
    {
      "Code Issue / Anti-Pattern Identified": "WebView with JavaScript bridge or untrusted content",
      "What the Issue Is": "A WebView loads content that is not fully controlled, or exposes a native bridge through addJavascriptInterface or a message handler without restricting which origins can call it. JavaScript in that WebView reaches native capability. Loading remote or user-supplied content into a bridged WebView is the highest-risk combination.",
      "Topic / Framework(s)": "OWASP MASVS, OWASP Top 10",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "MobSF, Android Lint, Semgrep",
      "Why This Matters": "Remote code path into native capabilities"
    },
    {
      "Code Issue / Anti-Pattern Identified": "allowBackup enabled with sensitive data",
      "What the Issue Is": "The Android manifest allows backup, so the app's private data directory, including tokens and local databases, is copied into cloud or local backups. Those backups can be extracted or restored onto another device. Sensitive data leaves the sandbox by a route the app never explicitly chose.",
      "Topic / Framework(s)": "OWASP MASVS",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "MobSF, Android Lint",
      "Why This Matters": "adb backup extracts user data"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No certificate pinning, or pinning with no rotation plan",
      "What the Issue Is": "The app trusts the device's certificate store, so a user-installed or enterprise root certificate can intercept its traffic, or it pins a certificate with no plan for rotation or fallback. The first case allows straightforward interception; the second causes total outage when the certificate is renewed. Both are decisions that need to be made deliberately.",
      "Topic / Framework(s)": "OWASP MASVS, Zero Trust",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "MobSF",
      "Why This Matters": "Either MITM exposure or a self-inflicted outage at cert renewal"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Sensitive data in logs, screenshots or the app-switcher snapshot",
      "What the Issue Is": "Personal or authentication data is written to logcat or the console, appears in screenshots the user takes, or is captured in the app-switcher snapshot the operating system generates when the app backgrounds. Device logs are readable by other apps in some configurations and by anyone with the device. The snapshot in particular is often overlooked.",
      "Topic / Framework(s)": "OWASP MASVS, Privacy/GDPR",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "MobSF, Semgrep",
      "Why This Matters": "Leaks through channels nobody reviews"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Sensitive content in push notification payloads",
      "What the Issue Is": "Notification payloads carry the content itself, such as message text, amounts or health information, rather than a reference to fetch after authentication. Notifications render on the lock screen where anyone holding the device can read them. They also pass through a third-party push service.",
      "Topic / Framework(s)": "OWASP MASVS, Privacy/GDPR",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Displayed on a locked screen and stored by the OS"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Sensitive data copied to the shared clipboard",
      "What the Issue Is": "The app copies tokens, passwords, account numbers or personal data to the system clipboard, which is shared across all applications and, on some platforms, synchronised to other devices. Any app can read it. Both platforms now warn the user when this happens.",
      "Topic / Framework(s)": "OWASP MASVS",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "MobSF, Semgrep",
      "Why This Matters": "Readable by other apps"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Permissions requested up front or broader than needed",
      "What the Issue Is": "The app requests permissions at first launch rather than at the moment the feature needs them, or requests broader scopes than the feature uses, such as precise location where approximate would do. Users deny permissions they do not understand the reason for. The result is worse permission grant rates and a larger privacy footprint.",
      "Topic / Framework(s)": "Store policy, Apple HIG, Android Core App Quality",
      "Area / Pillar": "Privacy, UX",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint, MobSF",
      "Why This Matters": "Store rejection and permission denial at first run"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Permission-denied and permanently-denied paths not handled",
      "What the Issue Is": "The code handles the granted case but not the denied case, and not the permanently denied case where the system will no longer show a prompt. The feature silently does nothing, with no explanation and no route to the settings screen where the user could change it. Users conclude the feature is broken.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "UX Resilience",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Feature silently does nothing with no explanation"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Trusting the device clock for expiry or ordering",
      "What the Issue Is": "Token expiry, cache validity, scheduling or event ordering is computed from the device clock, which the user can change freely and which drifts. Logic that assumes it moves forward monotonically breaks. It is also a trivial bypass for any client-side time restriction.",
      "Topic / Framework(s)": "OWASP MASVS, CWE Top 25",
      "Area / Pillar": "Correctness, Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Users can change the clock, and often have"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hardcoded endpoints, no build flavours or schemes",
      "What the Issue Is": "Backend URLs are hardcoded in source rather than defined per build flavour, scheme or configuration. Pointing a build at a different environment requires a code change. It is also a common route for a test build to end up talking to production.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Android Lint, Semgrep",
      "Why This Matters": "Test builds pointed at production"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No crash, ANR or startup-time monitoring",
      "What the Issue Is": "The app reports no crashes, no Application Not Responding events and no startup timing from real devices. Store consoles show a partial picture and only for some failure classes. The team's understanding of stability is limited to what users choose to write in reviews.",
      "Topic / Framework(s)": "Observability, Android Vitals",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Store console vitals are the only signal, and they arrive late"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Correlation ID not propagated from app to backend",
      "What the Issue Is": "The app does not generate or send a request identifier that the backend records, so a user-reported failure cannot be joined to the server-side record of that request. Each side holds half the evidence. Diagnosis becomes a search through timestamps and guesswork.",
      "Topic / Framework(s)": "Observability, CNCF Cloud Native",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A user's crash cannot be tied to a server trace"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Missing content descriptions or accessibility labels",
      "What the Issue Is": "Images, icon buttons and custom views are presented without content descriptions or accessibility labels, so TalkBack and VoiceOver announce them as unlabelled. The user is told a control exists but not what it does. Icon-only toolbars are the most common case.",
      "Topic / Framework(s)": "WCAG 2.2, Android/iOS accessibility",
      "Area / Pillar": "Accessibility",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Accessibility Scanner, Android Lint, Xcode Accessibility Inspector",
      "Why This Matters": "TalkBack and VoiceOver users are locked out"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Tap targets below the minimum size",
      "What the Issue Is": "Touch targets are smaller than the platform guidance of roughly 44 points on iOS or 48 density-independent pixels on Android, or sit close enough together that adjacent targets overlap. Users mis-tap, and users with reduced motor control cannot reliably hit them at all. Both platforms allow the touch area to be enlarged beyond the visual bounds.",
      "Topic / Framework(s)": "WCAG 2.2, Apple HIG, Material",
      "Area / Pillar": "Accessibility",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Accessibility Scanner, Android Lint",
      "Why This Matters": "Unusable for motor-impaired users, frustrating for everyone"
    },
    {
      "Code Issue / Anti-Pattern Identified": "No support for dynamic type, large fonts or dark mode",
      "What the Issue Is": "The layout uses fixed sizes that break when the user increases the system font scale, and the app does not provide a dark theme even though the platform exposes the preference. Both are system-level settings users rely on. Ignoring them makes the app the only one on the device that does not respond.",
      "Topic / Framework(s)": "WCAG 2.2, Apple HIG, Material",
      "Area / Pillar": "Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Accessibility Scanner",
      "Why This Matters": "Layout breaks the moment a user changes a system setting"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Layout assumes one screen size, no safe-area handling",
      "What the Issue Is": "The interface is designed for one reference device, with hardcoded dimensions and no handling of the safe-area insets on devices with a notch, rounded corners or a home indicator. Content is clipped or placed under system chrome on other devices. The affected devices are usually the newer and larger ones.",
      "Topic / Framework(s)": "Apple HIG, Android Core App Quality",
      "Area / Pillar": "UX",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint",
      "Why This Matters": "Content under notches, cut off on tablets and foldables"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Slow cold start or blocking splash work",
      "What the Issue Is": "The app takes noticeably long to become usable from a cold start, because initialisation work such as dependency graph construction, migrations, analytics setup and remote configuration fetches runs serially before the first screen. The splash screen hides the delay without reducing it. Startup time is one of the metrics stores now surface publicly.",
      "Topic / Framework(s)": "Android Vitals, Apple HIG",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Perfetto, Instruments",
      "Why This Matters": "Directly tracked by both stores and by users"
    },
    {
      "Code Issue / Anti-Pattern Identified": "App size bloat, no bundle splitting or resource shrinking",
      "What the Issue Is": "The shipped binary is larger than it needs to be because unused resources, code and dependencies are not stripped and the app is not split by architecture or density. Download size directly affects install conversion, particularly on constrained connections and devices. It also affects update adoption.",
      "Topic / Framework(s)": "Android Vitals, Store policy",
      "Area / Pillar": "Cost, Adoption",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "apkanalyzer, Android Lint",
      "Why This Matters": "Install abandonment on metered connections"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Target SDK lag or deprecated API usage",
      "What the Issue Is": "The app targets an older platform version than current store requirements, or continues to call APIs that have been deprecated or restricted. Store submission eventually fails, and behaviour changes in newer OS releases are not applied. The upgrade becomes more disruptive the longer it is deferred.",
      "Topic / Framework(s)": "Store policy, NIST SSDF",
      "Area / Pillar": "Compliance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Android Lint, Xcode warnings",
      "Why This Matters": "Store submission blocked on a deadline you did not set"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unpinned or unvetted third-party SDKs",
      "What the Issue Is": "Third-party SDKs are included with floating versions, from sources that have not been reviewed, or for capabilities the app barely uses. Each one runs with the app's full permissions and can collect data on its own. Store privacy declarations must account for their behaviour as well as your own.",
      "Topic / Framework(s)": "SLSA, OWASP MASVS, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Dependabot, Renovate, MobSF",
      "Why This Matters": "An SDK update ships behaviour you did not review"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unsigned or non-reproducible release builds",
      "What the Issue Is": "Release builds are produced without a verifiable signing process, or in a way that cannot be reproduced from a known commit. It is not possible to establish that a given binary corresponds to a given source revision. Provenance for the artifact users actually installed does not exist.",
      "Topic / Framework(s)": "SLSA, CI/CD",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Cosign, Gradle verification",
      "Why This Matters": "Cannot prove what is in a released binary"
    },
    {
      "Code Issue / Anti-Pattern Identified": "Deep link opens the target screen with no synthesised back stack",
      "What the Issue Is": "A deep link opens the target screen directly with an empty back stack, so pressing back exits the application rather than moving up to the logical parent. The platforms both provide a way to synthesise the intermediate destinations. Without it users arriving from a notification or a shared link have nowhere to go but out.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Navigation",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The user lands mid-flow and back exits the app entirely, which reads as a crash to anyone who did not open it deliberately."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Up navigation and system back behave differently on the same screen",
      "What the Issue Is": "The toolbar up arrow and the system back gesture or button produce different results on the same screen, because up is wired to a hardcoded parent while back pops the actual stack. Users treat them as the same affordance. The divergence is only visible by reading both handlers together.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Navigation, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Two affordances that look equivalent produce different results, and the inconsistency only shows when both are read together."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Navigation state held in a view model as well as the navigation graph",
      "What the Issue Is": "The current destination is tracked both by the navigation component and by a flag or state field in a view model. After process death, a deep link or a configuration change only one of the two is restored. The screen then renders content for a route the navigator does not think it is on.",
      "Topic / Framework(s)": "Android Core App Quality, Clean Architecture",
      "Area / Pillar": "Navigation, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The two disagree after process death or an external deep link, and the screen renders against the wrong route."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Screens pushed by direct fragment or view controller manipulation, bypassing the navigation component",
      "What the Issue Is": "Screens are pushed by directly manipulating fragments, view controllers or a container, bypassing the navigation graph or router. Only the screens that went through the router are addressable, so deep linking, state restoration and back stack handling work for an arbitrary subset of the app. Which subset is not documented anywhere.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Navigation, Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Android Lint (partial)",
      "Why This Matters": "Half the app is routable and half is not, so deep linking and state restoration work on an arbitrary subset of screens."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Modal, bottom sheet or dialog presented without a back or dismiss handler",
      "What the Issue Is": "A modal, bottom sheet or full-screen dialog is presented without registering a handler for the system back gesture or button. Back dismisses the screen underneath it, or the entire app, rather than the overlay. On Android with predictive back this is now visible to the user during the gesture.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Navigation, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Back dismisses the screen underneath instead of the overlay, or does nothing at all."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Back press intercepted globally rather than per screen",
      "What the Issue Is": "Back handling is registered once at the application or host activity level and branches on the current state, rather than each screen owning its own behaviour. Adding a screen means editing a central handler. Behaviour becomes hard to predict because the logic lives nowhere near the screen it affects.",
      "Topic / Framework(s)": "Android Core App Quality",
      "Area / Pillar": "Navigation",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One screen's interception changes back behaviour everywhere, and the cause sits nowhere near the symptom."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Navigation arguments passed through shared singleton state rather than typed route arguments",
      "What the Issue Is": "Data needed by a destination is passed by writing it into a singleton, a shared repository or a static field before navigating, rather than as typed arguments on the route. After process death the singleton is empty and the destination has nothing to render. The dependency is not visible at either the call site or the destination.",
      "Topic / Framework(s)": "Android Core App Quality, Clean Architecture",
      "Area / Pillar": "Navigation, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The destination reads stale or absent arguments after process death, and nothing in the call site suggests it could."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Multi-step flow with no route back to a completed step",
      "What the Issue Is": "A multi-step flow such as onboarding or checkout only moves forward, with no way to return to and amend a completed step. A user who realises they mistyped something in step one must abandon and restart. The stack was constructed so that earlier steps were removed.",
      "Topic / Framework(s)": "Apple HIG, Material Design",
      "Area / Pillar": "Navigation, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A user who mistypes something in step one has to abandon and restart the whole flow."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Notification or widget tap opens a cold app with no route to the referenced content",
      "What the Issue Is": "Tapping a notification or a home screen widget launches the app but lands on the default screen, because the referenced content was not translated into a route. The notification promised something specific and delivered the home screen. Users learn quickly to stop tapping them.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Navigation",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The notification promises specific content and delivers the home screen, which is the fastest way to train users to ignore notifications."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Tab or bottom navigation stack reset behaviour inconsistent across tabs",
      "What the Issue Is": "Re-selecting an already active tab pops that tab to its root in some tabs and preserves the stack in others, and switching away and back sometimes resets state. The behaviour was decided independently per tab. Users cannot form a reliable model of what the tab bar does.",
      "Topic / Framework(s)": "Material Design, Apple HIG",
      "Area / Pillar": "Navigation, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Re-selecting a tab pops to root in some tabs and preserves the stack in others."
    },
    {
      "Code Issue / Anti-Pattern Identified": "A screen reachable from two entry points with different completion destinations",
      "What the Issue Is": "A screen is reachable from more than one place, and where it sends the user on completion is decided by each caller rather than by the screen or the route. The branching logic is spread across the callers. Adding a third entry point means finding and updating all of the existing ones.",
      "Topic / Framework(s)": "Android Core App Quality, Clean Architecture",
      "Area / Pillar": "Navigation, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Finishing the screen sends the user somewhere that depends on how they arrived, and the branching is spread across callers."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Route defined only in code, unreachable by App Links or Universal Links",
      "What the Issue Is": "A destination exists in the navigation graph but has no corresponding App Link or Universal Link entry, so it cannot be opened from a URL. Content inside the app is unreachable from email, messaging, search and the web. This is usually the largest single acquisition path into a mobile app.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Navigation, Adoption",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Content cannot be linked to from email, web or search, which removes the main acquisition path into the app."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Web fallback URL and app deep link resolve to different content",
      "What the Issue Is": "The same canonical link resolves to one screen in the app and to different content on the website fallback, because the two route tables were built separately. A user with the app installed and a user without see different things from the same URL. Nobody notices because the two are rarely compared.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Navigation, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A shared link shows one thing to users with the app installed and another to everyone else."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Result returned from a screen through a shared singleton rather than a result API",
      "What the Issue Is": "A screen returns a value to its caller by writing into a shared object or event bus rather than using the platform result API. The result can be missed if the caller was recreated, or delivered twice. The connection between the two screens is invisible in both of their signatures.",
      "Topic / Framework(s)": "Android Core App Quality, Clean Architecture",
      "Area / Pillar": "Navigation, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The result is lost or duplicated across process death and configuration change, and the coupling is invisible at the call site."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Colours hardcoded in layouts or code rather than resolved from a theme attribute or asset catalog",
      "What the Issue Is": "Colours are written as literals in layout XML, SwiftUI views or Compose code rather than referenced from a theme attribute, asset catalog colour set or token. A second theme then requires locating every literal and reasoning about its role. The platform theming systems exist to make this a single indirection.",
      "Topic / Framework(s)": "Material Design, Apple HIG, Design Systems",
      "Area / Pillar": "Theming, Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint, SwiftLint custom rules",
      "Why This Matters": "Adding or changing a theme means finding every literal, so dark mode becomes a rewrite rather than a token swap."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Dark mode declared supported but only some screens themed",
      "What the Issue Is": "Dark mode is enabled and the main screens are themed, but individual custom views, dialogs, error and empty states, and less-visited screens keep light-mode colours. Those areas render as dark text on a dark ground or as bright panels in a dark app. Nothing in the build reports which screens were missed.",
      "Topic / Framework(s)": "Material Design, Apple HIG, WCAG 2.2",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Unthemed screens render dark text on a dark ground, and finding them means auditing every screen rather than every file."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Vector and raster assets not theme-aware",
      "What the Issue Is": "Illustrations, icons and raster assets are authored for a light background and used unchanged in dark mode, so they appear as bright blocks or become invisible. Vector assets can be tinted from the theme while raster assets need a dark variant. Determining which assets have this problem requires looking at them.",
      "Topic / Framework(s)": "Material Design, Apple HIG",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "White-background artwork punches holes in a dark screen, and no lint rule can tell which assets those are."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Theme applied after the first frame, causing a flash on cold start",
      "What the Issue Is": "The theme is read and applied after the first frame is rendered, typically because it is resolved from stored preferences inside the app's initialisation rather than from the launch theme. Every cold start shows a flash of the wrong theme. The fix has to move above the first inflation or render.",
      "Topic / Framework(s)": "Android Vitals, Apple HIG",
      "Area / Pillar": "Theming, Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every launch shows the wrong theme briefly, and the fix has to move above the first inflation or render."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No in-app theme override separate from the system setting",
      "What the Issue Is": "The app follows the system light and dark setting with no in-app control, so a user who wants this particular app in the other mode cannot say so. Reading-heavy and media-heavy apps commonly need this. The platform provides an API for exactly this override.",
      "Topic / Framework(s)": "Apple HIG, Material Design",
      "Area / Pillar": "Theming, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Users who want the app in a different mode from their device have no way to say so."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Theme change recreates the screen and loses in-progress state",
      "What the Issue Is": "Changing the theme recreates the screen, and because transient state is not saved and restored, in-progress input is discarded. A user who switches to dark mode mid-form loses what they typed. It is the same underlying defect as an unhandled configuration change.",
      "Topic / Framework(s)": "Android Core App Quality",
      "Area / Pillar": "Theming, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Switching theme mid-form discards what the user typed, and it is the same defect class as an unhandled configuration change."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Contrast validated in light mode only",
      "What the Issue Is": "Contrast is validated against the light palette, and the dark palette is produced by adjusting values until it looks acceptable. Secondary text, hint text, disabled controls and dividers commonly fall below the required ratio. Those states are the least likely to appear in a design review.",
      "Topic / Framework(s)": "WCAG 2.2 (1.4.3), Material Design",
      "Area / Pillar": "Theming, Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Accessibility Scanner, Xcode Accessibility Inspector",
      "Why This Matters": "The dark palette fails contrast on the states nobody screenshot, such as disabled and placeholder text."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Elevation and shadow reused unchanged in dark mode instead of remapped to surface tone",
      "What the Issue Is": "Depth in the light theme is expressed with drop shadows, which are effectively invisible on a dark surface. Material's dark theme conveys elevation by lightening the surface instead. Reusing the light values flattens the interface and removes the separation between layers.",
      "Topic / Framework(s)": "Material Design",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Shadows are invisible against a dark ground, so the depth cues the layout depends on disappear."
    },
    {
      "Code Issue / Anti-Pattern Identified": "WebView or embedded content not themed to match the host app",
      "What the Issue Is": "A WebView or embedded third-party view renders its own content in a fixed light theme inside a dark app. The transition between native and embedded content is jarring, and in some cases the embedded text becomes unreadable. Fixing it requires either a theming hook in the embedded content or a design decision to accept it.",
      "Topic / Framework(s)": "Material Design, Apple HIG",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One embedded screen stays bright inside a dark app and there is no styling hook in the app code to fix it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Status bar, navigation bar and system chrome colour not updated with the theme",
      "What the Issue Is": "The status bar, navigation bar and other system chrome keep their original colour and icon tint when the app theme changes. The system chrome then contradicts the app, for example dark icons on a dark bar. Both platforms expose APIs to set this alongside the theme.",
      "Topic / Framework(s)": "Material Design, Apple HIG",
      "Area / Pillar": "Theming",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "System chrome contradicts the app's theme, which reads as a rendering bug rather than a styling gap."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Literal white or black used for surfaces and text instead of semantic roles",
      "What the Issue Is": "Literal white and black are used for backgrounds, surfaces and text instead of semantic roles such as surface, on-surface and outline. Those values cannot be inverted, so dark mode requires a conditional at every usage. Semantic naming is what makes a theme swap mechanical.",
      "Topic / Framework(s)": "Material Design, Apple HIG, WCAG 2.2",
      "Area / Pillar": "Theming, Accessibility",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint, Stylelint-equivalent custom rules",
      "Why This Matters": "Colour semantics cannot be inverted, so dark mode has to special-case every usage."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Fixed dp or pt height on a container that holds text",
      "What the Issue Is": "A row, cell or container that contains text is given a fixed height in dp or points. As soon as the font scale increases, the language changes or the content is longer than the sample, the text is clipped or truncated. The constraint reads as a layout detail and behaves as a content bug.",
      "Topic / Framework(s)": "Material Design, Apple HIG, WCAG 2.2",
      "Area / Pillar": "Adaptive Layout",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint, Accessibility Scanner",
      "Why This Matters": "Text truncates as soon as the font scale, the language or the device changes."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Dynamic type or font scale breaks fixed-height rows and truncates labels",
      "What the Issue Is": "The layout uses fixed heights, single-line constraints or manually positioned elements that break when the user increases the system font scale. Labels truncate, controls overlap and some content becomes unreachable. Users who enlarge text are doing so because they need to, so the degradation lands on the people least able to absorb it.",
      "Topic / Framework(s)": "WCAG 2.2 (1.4.4), Apple HIG, Android Core App Quality",
      "Area / Pillar": "Accessibility, Adaptive Layout",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Accessibility Scanner (partial)",
      "Why This Matters": "The accessibility setting users depend on makes the app less usable rather than more."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No tablet, foldable or split-screen layout path",
      "What the Issue Is": "The app renders its phone layout on tablets, foldables and in split-screen, either stretched across the full width or letterboxed. Line lengths become unreadable and the available space is wasted. Both platforms' store quality programmes now assess large-screen behaviour explicitly.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Adaptive Layout",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The app runs stretched or letterboxed on a growing share of devices, and store quality programmes now check for it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Orientation change loses state, or is locked to avoid handling it",
      "What the Issue Is": "Rotating the device loses the state of the current screen, or the app pins itself to portrait to avoid dealing with it. Locking orientation hides an unhandled configuration change rather than fixing it, and the same defect resurfaces on foldables, split-screen and desktop windowing modes where orientation cannot be locked.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Adaptive Layout, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Locking orientation hides an unhandled configuration change that will resurface on foldables and multi-window."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Landscape layout untested, portrait assumed throughout",
      "What the Issue Is": "The layout is designed and tested in portrait only, so in landscape controls fall outside the visible area, keyboards cover the content, and scrolling is missing where it is now required. Any test suite that runs in a single configuration will not detect it. Landscape is the default posture on tablets.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Adaptive Layout",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Screenshot tests across configurations",
      "Why This Matters": "Controls sit off-screen in landscape, and the failure is invisible to any test that runs in one configuration."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Keyboard occludes the focused input, no inset or scroll handling",
      "What the Issue Is": "When the soft keyboard appears it covers the input the user is typing into, because the layout does not adjust for the keyboard insets and the content is not scrolled to keep the focused field visible. The user cannot see what they are entering. It reproduces on shorter screens and on layouts with content below the field.",
      "Topic / Framework(s)": "Material Design, Apple HIG",
      "Area / Pillar": "Adaptive Layout, Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The user cannot see what they are typing, and it only reproduces on shorter screens."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Multi-window, picture-in-picture or desktop windowing modes not handled",
      "What the Issue Is": "The app does not handle multi-window, split-screen, picture-in-picture or desktop windowing modes, which the platform can enter without the user explicitly choosing them per app. Layout breaks, media playback stops, or the app restarts. These modes are increasingly the default on tablets and foldables.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Adaptive Layout",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The app misbehaves in modes the platform enables by default and the user did not opt into."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Density-specific or scale-specific assets missing, so images upscale",
      "What the Issue Is": "Image assets are supplied at a single density or scale rather than for the range of screens in use. The system upscales them, producing soft or blocky artwork on high-density displays. Platform tooling reports which variants are missing.",
      "Topic / Framework(s)": "Material Design, Apple HIG",
      "Area / Pillar": "Adaptive Layout, Performance",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Android Lint, asset catalog validation",
      "Why This Matters": "Artwork looks soft on high-density displays, and platform tooling reports the missing variants directly."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Right-to-left layout unsupported, left and right used instead of start and end",
      "What the Issue Is": "Layouts use explicit left and right rather than start and end for margins, padding, alignment and drawables, and text direction is not accounted for. In right-to-left locales the layout does not mirror correctly. Platform linters catch the directional attributes but not the logic that positions things programmatically.",
      "Topic / Framework(s)": "WCAG 2.2, Material Design, Apple HIG",
      "Area / Pillar": "Localisation, Adaptive Layout",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint RTL checks",
      "Why This Matters": "The layout mirrors incorrectly for RTL locales, and platform linters catch the directional attributes but not the logic."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Labels truncated rather than wrapped when translated strings are longer",
      "What the Issue Is": "Labels and buttons are sized for the development language and truncate or ellipsise when translated strings are longer, which is routine for German, Finnish and many others. The app is legible during development and unreadable in half its markets. Pseudolocalisation surfaces this before translation exists.",
      "Topic / Framework(s)": "Localisation, Material Design",
      "Area / Pillar": "Localisation, Adaptive Layout",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Pseudolocalisation testing",
      "Why This Matters": "The app is legible in the development language and unreadable in the ones with longer words."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Safe-area or inset handling implemented on one platform only in a shared codebase",
      "What the Issue Is": "In a shared or cross-platform codebase, safe-area and inset handling is implemented for one platform and omitted for the other, because the work was done while testing on a single device. Content sits under the notch or the home indicator on the neglected platform. The difference lives across two files that are rarely read together.",
      "Topic / Framework(s)": "Apple HIG, Material Design",
      "Area / Pillar": "Adaptive Layout",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Content sits under system chrome on the platform that got less attention, and the difference lives across two files."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hardcoded screen dimensions or device model checks driving layout",
      "What the Issue Is": "Layout decisions are driven by hardcoded pixel dimensions or by checking the device model, rather than by size classes, window size classes or breakpoints. Every new device requires a code change. Devices the check has never seen are silently misclassified.",
      "Topic / Framework(s)": "Android Core App Quality, Apple HIG",
      "Area / Pillar": "Adaptive Layout",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Android Lint, Semgrep",
      "Why This Matters": "Every new device needs a code change, and the check silently misclassifies devices it has never seen."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Spacing, corner radius and elevation values assigned ad hoc rather than from a scale",
      "What the Issue Is": "Margins, padding, corner radii and elevation values are chosen per screen rather than taken from a defined scale. Individually each value looks reasonable and collectively the interface loses its rhythm. No single file shows the drift, so it is only visible when screens are compared.",
      "Topic / Framework(s)": "Material Design, Design Systems",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "detekt, ktlint, SwiftLint custom rules",
      "Why This Matters": "Visual rhythm degrades gradually, and no single file shows the drift."
    },
    {
      "Code Issue / Anti-Pattern Identified": "The same component implemented separately per screen with divergent behaviour",
      "What the Issue Is": "The same interface element, such as a confirmation dialog, an avatar, a status chip or an empty state, is implemented separately on several screens because each was built where it was needed. Behaviour, accessibility and styling diverge. A fix applied to one instance leaves the others unchanged and nothing indicates they exist.",
      "Topic / Framework(s)": "Design Systems, Clean Architecture",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "jscpd, CPD (partial)",
      "Why This Matters": "A fix lands on one copy, and finding the others requires comparing behaviour rather than text."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Loading, empty and error presentation inconsistent across screens",
      "What the Issue Is": "Loading, empty and error presentation is decided per screen, so one screen shows a spinner, another a skeleton and a third nothing, while errors appear variously as snackbars, inline text or a full-screen replacement. The user has to learn each screen separately. The inconsistency is only visible across screens.",
      "Topic / Framework(s)": "Design Systems, UX Resilience",
      "Area / Pillar": "Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Each screen teaches the user a different pattern, so the app feels like several products."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Date, number and currency formatted per screen rather than through one formatter",
      "What the Issue Is": "Dates, numbers, percentages and currency are formatted at each call site rather than through shared formatters. The same value renders differently on different screens, and locale correctness has to be fixed independently in every place. The platform provides locale-aware formatters that these call sites bypass.",
      "Topic / Framework(s)": "Localisation, Design Systems",
      "Area / Pillar": "Localisation, Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The same value displays differently on two screens, and only a cross-file read finds every formatter."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Platform conventions ignored in a cross-platform codebase",
      "What the Issue Is": "A cross-platform codebase applies one platform's navigation patterns, controls and gestures on both, for example a back arrow and no back gesture on Android, or Android-style dialogs on iOS. Each platform's users experience the app as foreign. It reads as a port rather than an application.",
      "Topic / Framework(s)": "Apple HIG, Material Design",
      "Area / Pillar": "Usability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One platform gets the other's navigation and control idioms, which reads as a port rather than an app."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Animation duration and easing chosen ad hoc, reduce-motion setting ignored",
      "What the Issue Is": "Animation durations and easing curves are chosen per animation rather than from a shared set, and the system reduce-motion preference is not checked. Timings drift apart across screens, and users who enable reduce-motion for vestibular reasons receive the full animation anyway. The preference is exposed by both platforms and simply not read.",
      "Topic / Framework(s)": "WCAG 2.2 (2.3.3), Material Design, Apple HIG",
      "Area / Pillar": "Accessibility, Usability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Accessibility Scanner (partial)",
      "Why This Matters": "Users who set reduce-motion for medical reasons get the animation anyway, and the timings drift apart across screens."
    }
  ],
  "AI & LLM Applications": [
    {
      "Code Issue / Anti-Pattern Identified": "Prompt assembled by concatenating untrusted input",
      "What the Issue Is": "The prompt sent to the model is built by inserting user-supplied text, retrieved documents or tool output directly into the instruction template. The model cannot distinguish your instructions from content that arrived with the request, so text such as ignore previous instructions is read as an instruction. The injected content often arrives indirectly, through a document the user uploaded or a page the system retrieved.",
      "Topic / Framework(s)": "OWASP LLM Top 10, NIST AI RMF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "garak, LLM Guard (shallow)",
      "Why This Matters": "Injection is a data-flow problem across template, retrieval and tool layers, so it needs reasoning about where user text ends up."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Tool or function call executed without an allow-list or argument validation",
      "What the Issue Is": "The model is allowed to name a tool and its arguments, and the application executes whatever it names without checking the tool against an allow-list for the current user or validating the arguments. A model that has been manipulated, or has simply reasoned badly, invokes a real operation. Whatever the tool can do, the model can now cause.",
      "Topic / Framework(s)": "OWASP LLM Top 10, Zero Trust",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A model-chosen argument reaches real systems, and the blast radius is whatever the tool can do."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Model output rendered as HTML or Markdown without sanitisation",
      "What the Issue Is": "Text produced by the model is inserted into the page as HTML or rendered as Markdown without sanitisation. Generated content is untrusted content, so a script tag, an event handler or an image whose URL encodes conversation data all execute or fire. Markdown is the subtler case, because image and link syntax can exfiltrate data without any obviously dangerous markup.",
      "Topic / Framework(s)": "OWASP LLM Top 10, OWASP Top 10",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep, DOMPurify as a fix",
      "Why This Matters": "Generated content is untrusted content, and a link or image tag in it becomes an exfiltration channel."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Model output parsed as JSON with no schema validation or repair path",
      "What the Issue Is": "The application asks the model for JSON and parses the response directly, with no schema validation, no handling of prose wrapped around the JSON, and no repair or retry path. Models produce well-formed output most of the time and not always. A single malformed response becomes an unhandled exception on a live request path.",
      "Topic / Framework(s)": "OWASP LLM Top 10, Contract Testing",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A single malformed response takes down the request path, and the failure is invisible until production traffic hits it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No token or cost ceiling per request, session or tenant",
      "What the Issue Is": "There is no limit on how many tokens a single request, conversation or tenant can consume, and no budget that can be exhausted safely. Cost scales with input the caller controls. A long document, a loop, or an adversarial prompt can consume a disproportionate share of spend before anyone notices.",
      "Topic / Framework(s)": "AWS Well-Architected, FinOps",
      "Area / Pillar": "Cost",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Cost is unbounded by construction, and one adversarial or looping input can spend a month of budget."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No timeout on the model call",
      "What the Issue Is": "The call to the model provider is issued with no explicit timeout, so it inherits the SDK default, which is often very long or unbounded. A stalled provider connection holds the request thread. It is the same failure mode as any other outbound call, applied to a dependency whose latency varies by orders of magnitude.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, SonarQube",
      "Why This Matters": "A provider stall holds the request thread, and this is the same pattern as any other outbound call that linters already catch."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Retry loop wrapped around a non-idempotent tool call",
      "What the Issue Is": "A retry wrapper is placed around a model call that invokes tools with real side effects, such as sending a message, writing a record or making a payment. The first attempt may have completed the side effect before the response was lost. The model has no memory that it already acted.",
      "Topic / Framework(s)": "Release It!, AWS Well-Architected",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The retry duplicates a real side effect such as an email, a charge or a write, and the model cannot tell it happened twice."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No fallback model or degraded path on provider 429 or 5xx",
      "What the Issue Is": "When the provider returns a rate-limit or server error the application surfaces the failure directly, with no secondary provider, no smaller model, no cached response and no non-AI path. Model providers have incidents like any other dependency. The product's availability is capped at the provider's.",
      "Topic / Framework(s)": "Release It!, Netflix Chaos",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A single vendor incident becomes a full product outage with no reduced-capability mode."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Provider SDK called directly from many call sites, no adapter",
      "What the Issue Is": "Calls to the model provider's SDK are spread across many modules rather than routed through a single adapter that owns prompting, retries, timeouts and error mapping. Changing model, provider or prompt strategy means editing every call site. This is what makes later migration expensive enough to be deferred indefinitely.",
      "Topic / Framework(s)": "Twelve-Factor App, Clean Architecture",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Changing model, provider or prompt strategy then means touching every call site, which is what blocks migration later."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Model name and version hardcoded rather than configurable",
      "What the Issue Is": "The model identifier is written as a literal in code rather than supplied by configuration. Providers deprecate and retire models on their own schedule, usually with a fixed cutoff date. When that date arrives the change becomes a code edit, a build and a deploy under time pressure.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "Model deprecation runs on the provider's schedule, and a hardcoded name turns that into a code change under time pressure."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Sampling parameters left at defaults on a path that needs determinism",
      "What the Issue Is": "Temperature, top-p and related sampling parameters are left at provider defaults on paths that need reproducible output, such as extraction, classification or routing. The same input produces different results on different calls. Downstream records then differ for reasons nothing in the system records.",
      "Topic / Framework(s)": "NIST AI RMF",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Extraction and classification paths become non-reproducible, and the same input yields different downstream records."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No eval suite, quality asserted by exact string match on model output",
      "What the Issue Is": "There is no evaluation suite for model behaviour, and what tests exist assert that the output equals a specific string. Model output varies legitimately, so those tests either fail constantly or are written so loosely that they cannot fail. Prompt and model changes then ship with no measurement of whether quality moved.",
      "Topic / Framework(s)": "NIST AI RMF, DORA",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "promptfoo, DeepEval",
      "Why This Matters": "Without evals there is no signal that a prompt or model change regressed behaviour, so quality drifts silently."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Evals exist but run only locally, never in CI",
      "What the Issue Is": "An evaluation suite exists but is run manually on a developer machine rather than in the pipeline, so it does not block a merge or a deploy. It reports on whatever state someone last chose to test. Regressions reach production and are discovered by users.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "promptfoo, Giskard",
      "Why This Matters": "An eval that does not gate a merge is documentation rather than a control."
    },
    {
      "Code Issue / Anti-Pattern Identified": "PII or secrets included in prompts sent to a third-party provider",
      "What the Issue Is": "Prompts include personal data, credentials or internal content and are sent to a third-party model provider. The data crosses the trust boundary through a code path that data-loss prevention tooling does not inspect, and the provider's retention and training policy then governs it. What is included is often incidental, such as an entire record passed where one field was needed.",
      "Topic / Framework(s)": "Privacy/GDPR, OWASP LLM Top 10, NIST SSDF",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Presidio, Gitleaks (secrets only)",
      "Why This Matters": "Data leaves the trust boundary through a path no DLP rule is watching, and provider retention policy governs it from then on."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Prompts and completions logged verbatim with no redaction or retention limit",
      "What the Issue Is": "Prompts and completions are written to logs in full, without redaction and without a retention limit, usually to make debugging easier. Because prompts contain whatever the user typed and whatever was retrieved, the log becomes a comprehensive store of personal data. It typically has weaker access controls than the systems the data came from.",
      "Topic / Framework(s)": "Privacy/GDPR, NIST SSDF",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Presidio",
      "Why This Matters": "Debug logging quietly builds the largest unmanaged store of personal data in the system."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Conversation history grown without a truncation or summarisation budget",
      "What the Issue Is": "Conversation history is accumulated and resent on every turn with no truncation, summarisation or token budget. Cost and latency grow with session length. Eventually the context limit is reached and a feature that worked at the start of the conversation returns an error.",
      "Topic / Framework(s)": "Static Performance, FinOps",
      "Area / Pillar": "Cost, Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Cost and latency rise with session length until the context limit turns a working feature into an error."
    },
    {
      "Code Issue / Anti-Pattern Identified": "RAG index not rebuilt or invalidated when the source changes",
      "What the Issue Is": "Documents are embedded into a vector index once, and the index is not rebuilt or invalidated when the source documents change or are deleted. Retrieval returns superseded content, and the model presents it with the same confidence as current content. Deleted documents can continue to be surfaced indefinitely.",
      "Topic / Framework(s)": "NIST AI RMF, DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The system answers confidently from stale documents, and nothing in the response signals that it is out of date."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Retrieval ignores the caller's authorisation scope",
      "What the Issue Is": "Retrieval queries the vector index without applying the calling user's access scope, so documents are ranked by similarity across everything indexed. In a multi-tenant or permissioned corpus this returns content the user cannot otherwise see. The leak is presented as a fluent answer rather than as a rejected query.",
      "Topic / Framework(s)": "Zero Trust, OWASP LLM Top 10",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A shared vector index becomes a cross-tenant read, and the leak arrives as fluent prose rather than a rejected query."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Chunking or embedding model mismatched between index time and query time",
      "What the Issue Is": "Documents were indexed with one chunking strategy or embedding model, and queries are embedded with different settings, or the index was built by a pipeline that has since changed. Retrieval quality drops without any error being raised. The symptom looks like a weak model rather than a mismatched pipeline.",
      "Topic / Framework(s)": "NIST AI RMF",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Retrieval quality degrades without an error, so the failure looks like a model problem instead of a pipeline problem."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No provenance or citation returned with a generated answer",
      "What the Issue Is": "Answers are returned without references to the source passages they were derived from. Users cannot check a claim, and after an incident nobody can determine which document produced the output. Retrieval systems have this information at generation time and discard it.",
      "Topic / Framework(s)": "NIST AI RMF, EU AI Act",
      "Area / Pillar": "Compliance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Users cannot verify claims and the team cannot audit an incident back to a source document."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Agent loop with no step, depth or wall-clock bound",
      "What the Issue Is": "An agent loop that plans, calls tools and re-plans has no maximum number of steps, no recursion depth limit and no wall-clock deadline. Loops that fail to converge run until something external kills them. Tokens, tool calls and downstream load all accumulate in the meantime.",
      "Topic / Framework(s)": "Release It!, Google SRE",
      "Area / Pillar": "Reliability, Cost",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A reasoning loop that fails to converge burns tokens and holds resources until something else times out."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Agent granted write or destructive capability with no human confirmation gate",
      "What the Issue Is": "An agent is given tools that delete, send, publish or pay, and executes them without a human confirmation step or a dry-run mode. Correct plans and incorrect plans are executed identically. Actions of this class are usually the ones that cannot be undone.",
      "Topic / Framework(s)": "Zero Trust, NIST AI RMF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Autonomy combined with a delete or send capability makes one bad plan irreversible."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No guardrail or moderation check on user input or model output",
      "What the Issue Is": "Neither user input nor model output passes through any moderation, policy or safety check before being acted on or displayed. For consumer-facing and regulated products a documented control is expected. Adding one after launch means changing the call path rather than adding a wrapper.",
      "Topic / Framework(s)": "OWASP LLM Top 10, EU AI Act",
      "Area / Pillar": "Compliance, Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "LLM Guard, NeMo Guardrails",
      "Why This Matters": "Regulated and consumer-facing surfaces need a documented control, and adding one after launch means reworking the call path."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Model calls untraced, no per-call latency, token or error telemetry",
      "What the Issue Is": "Model calls are not instrumented, so there is no record of per-call latency, token counts, cost, error class or which model version served the request. Cost and quality regressions are both invisible. The first signal is usually the monthly invoice or a user complaint.",
      "Topic / Framework(s)": "Observability, OpenTelemetry GenAI",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "OpenTelemetry GenAI semantic conventions",
      "Why This Matters": "Without per-call telemetry, cost regressions and quality regressions are both invisible until the invoice or a complaint arrives."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Training or fine-tuning data path not separated from production PII stores",
      "What the Issue Is": "Data used for fine-tuning or training is drawn from production stores containing personal data, without a separate, filtered pipeline. Personal data that enters model weights cannot be located or deleted on request. A shortcut in the data pipeline becomes a compliance problem that cannot be remediated.",
      "Topic / Framework(s)": "Privacy/GDPR, NIST AI RMF",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Personal data entering model weights cannot be deleted on request, which turns a pipeline shortcut into a compliance problem."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Streaming response continues after the client disconnects",
      "What the Issue Is": "When a client disconnects mid-stream the server continues consuming the model's output to completion rather than cancelling the upstream call. Tokens are generated and billed for a response nobody receives. It only appears under real usage, where users abandon slow responses.",
      "Topic / Framework(s)": "Static Performance, FinOps",
      "Area / Pillar": "Cost",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Tokens are billed for output nobody receives, and the pattern only shows up under real user cancel behaviour."
    }
  ],
  "Async: Queues, Jobs, Events": [
    {
      "Code Issue / Anti-Pattern Identified": "Ordering assumed across a partitioned or sharded topic",
      "What the Issue Is": "The consumer relies on messages arriving in the order they were produced, but the topic or queue is partitioned and ordering is only guaranteed within a partition. With one partition it works, and it stops working the moment throughput requires more. The assumption is usually implicit, expressed as code that processes a create before an update.",
      "Topic / Framework(s)": "Enterprise Integration Patterns, CNCF Cloud Native",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Per-partition ordering is not global ordering, and the bug appears only when volume forces more than one partition."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Message schema evolved without a compatibility mode",
      "What the Issue Is": "A field is added, removed or retyped in the message format without configuring or checking a compatibility mode in the schema registry. Producers and consumers deploy independently, so there is always a window where both versions are live. Consumers already running receive messages they cannot parse.",
      "Topic / Framework(s)": "Enterprise Integration Patterns, Contract Testing",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Schema registry compatibility checks, Specmatic",
      "Why This Matters": "Producer and consumer deploy independently, so an incompatible field change breaks consumers already in flight."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Scheduled job with no overlap guard, so slow runs stack",
      "What the Issue Is": "A job scheduled at a fixed interval has no lock or lease preventing a second instance from starting while the first is still running. When a run takes longer than its interval the instances overlap and compound. Load increases exactly when the system is already slow, which is how a slowdown becomes an outage.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Once a run exceeds its interval the instances compound, and the system degrades exactly when it is already slow."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Cron schedule assumes a fixed timezone or a DST-stable clock",
      "What the Issue Is": "A cron expression is interpreted in a local timezone that observes daylight saving. On the spring transition the scheduled hour does not exist and the job is skipped, and on the autumn transition it occurs twice and the job runs twice. The result appears as a gap or a duplicate in data rather than as a failed job.",
      "Topic / Framework(s)": "Static Performance, Google SRE",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Twice a year a job runs twice or not at all, which shows up as a data gap rather than an alert."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Consumer acknowledges the message before the work commits",
      "What the Issue Is": "The consumer acknowledges the message to the broker before the work it triggered has been committed. If the process crashes between the acknowledgement and the commit, the broker considers the message handled and will not redeliver it. The work is lost with no record anywhere that it existed.",
      "Topic / Framework(s)": "Enterprise Integration Patterns, Release It!",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A crash between ack and commit loses the work permanently with no trace left in the queue."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Database write and broker publish performed without an outbox",
      "What the Issue Is": "A handler writes to the database and publishes an event as two separate operations. There is no atomicity between them, so a crash or a broker failure between the two leaves the database updated and the event unsent, or the reverse. The transactional outbox pattern exists to make these one commit.",
      "Topic / Framework(s)": "Enterprise Integration Patterns, AWS Well-Architected",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The two operations are not atomic, so a failure between them leaves the store and the event stream permanently disagreeing."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No visibility timeout or lease renewal for long-running handlers",
      "What the Issue Is": "A handler takes longer than the broker's visibility timeout or lease duration, and does not extend the lease while working. The broker concludes the consumer has died and redelivers the message to another consumer while the first is still processing it. Two workers then do the same work concurrently.",
      "Topic / Framework(s)": "AWS Well-Architected, CNCF Cloud Native",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The broker redelivers work that is still in progress, producing silent duplicate processing."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Retry and dead-letter policy set per broker rather than per failure class",
      "What the Issue Is": "Retry counts, backoff and the dead-letter destination are configured once for the whole broker or consumer, rather than per class of failure. A malformed payload will never succeed and should go straight to the dead-letter queue, while a downstream timeout should be retried patiently. A single policy is wrong for one of them.",
      "Topic / Framework(s)": "Enterprise Integration Patterns, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A validation failure and a downstream outage need opposite handling, and one policy gets both wrong."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Poison message replayed indefinitely because failure is not classified",
      "What the Issue Is": "When a handler fails, the failure is not classified as retryable or permanent, so an unprocessable message is redelivered indefinitely. It occupies the consumer continuously and, on an ordered partition, blocks every message behind it. Throughput drops to zero for reasons that look like a broker problem.",
      "Topic / Framework(s)": "Release It!, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One unprocessable message consumes the consumer's whole throughput and stalls everything behind it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Consumer concurrency unbounded relative to the downstream it calls",
      "What the Issue Is": "Consumer concurrency or replica count is tuned against the queue depth rather than against what the downstream systems can absorb. Scaling up to clear a backlog multiplies the load on a database or API that did not agree to it. The recovery action then causes a second, larger incident.",
      "Topic / Framework(s)": "Release It!, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Scaling the consumer scales the load on a dependency that never agreed to it, which is how a backlog becomes an outage."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Fan-out amplification, one event triggers many with no damping",
      "What the Issue Is": "One incoming event causes the handler to publish several events, each of which causes more, so volume multiplies at each hop with no rate limiting or aggregation. A modest spike at the entry point becomes an overwhelming one several hops in. The multiplication factor is only calculable by reading the services together.",
      "Topic / Framework(s)": "Netflix Chaos, Google SRE",
      "Area / Pillar": "Reliability, Cost",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A small upstream spike multiplies through the graph, and the amplification factor is only visible by reading several services together."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Event carries a mutable reference instead of the state at the time",
      "What the Issue Is": "The event contains an identifier and the consumer fetches the current state, rather than the event carrying the state as it was when the event occurred. By the time the consumer runs the state may have changed again. Replaying the event stream then produces a different outcome than the original processing did.",
      "Topic / Framework(s)": "Enterprise Integration Patterns, DDD",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The consumer reads a value that has since changed, so replay produces a different result than the original run."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No consumer lag metric or alert",
      "What the Issue Is": "There is no metric for how far behind the consumer is, and no alert on it. Liveness and readiness checks pass because the process is running and connected. A consumer that has stopped making progress looks identical to a healthy one until the backlog is too large to clear.",
      "Topic / Framework(s)": "Observability, Google SRE",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A stalled consumer looks healthy on liveness checks while the backlog silently grows past recovery."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Worker has no graceful drain on shutdown, in-flight messages are lost",
      "What the Issue Is": "The worker does not handle termination signals by stopping intake, finishing in-flight messages and releasing leases before exiting. Every deploy, autoscale event and node rotation therefore interrupts work mid-flight. Depending on the acknowledgement strategy this either loses work or duplicates it.",
      "Topic / Framework(s)": "CNCF Cloud Native, Twelve-Factor App",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every deploy and every autoscale event becomes a small correctness incident."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Job state kept in worker memory rather than durable storage",
      "What the Issue Is": "Progress or intermediate state for a long-running job is held in the worker's memory rather than persisted, so a restart loses it and the job must begin again or is abandoned. The design assumes workers are long-lived, which is the opposite of how they are deployed. It also prevents the job from being resumed by a different worker.",
      "Topic / Framework(s)": "Twelve-Factor App, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The work cannot survive a restart, and the system quietly depends on workers being long-lived."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Backfill or replay path shares the live consumer group",
      "What the Issue Is": "A replay or backfill is run through the same consumer group as live traffic, so historical messages compete with current ones for the same consumers. Real-time processing falls behind while the replay proceeds. A remediation step turns into a second incident.",
      "Topic / Framework(s)": "Enterprise Integration Patterns, DORA",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A replay starves real-time processing, so a recovery action causes a second incident."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Multi-step workflow with no compensating action for partial failure",
      "What the Issue Is": "A business operation spans several services or steps, and there is no defined compensating action when a later step fails after earlier ones have committed. The system is left in a state that no individual step intended. Repairing it is manual work performed under incident conditions.",
      "Topic / Framework(s)": "Enterprise Integration Patterns, Release It!",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The system settles into a state no step intended, and reconciling it is manual work under pressure."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Distributed lock without a fencing token or TTL",
      "What the Issue Is": "A lock is taken in a shared store with no expiry, or with an expiry but no fencing token that the protected resource checks. A holder that pauses long enough for the lease to expire resumes and continues writing, unaware that another holder has taken over. Both then write, and the lock provided no protection at the point it mattered.",
      "Topic / Framework(s)": "CWE Top 25, Static Performance",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A paused holder resumes after the lease expires and writes over the new holder's work."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Low-priority bulk work shares a queue with interactive work",
      "What the Issue Is": "Bulk or batch work is submitted to the same queue that carries user-facing requests, with no separate queue or priority. A large batch fills the queue and interactive requests wait behind it. Queue depth and consumer health both look normal while user-visible latency degrades.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A nightly batch pushes user-facing latency past its objective, and the queue metrics show nothing unusual."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Batch size fixed regardless of payload size",
      "What the Issue Is": "Messages are batched by a fixed count without regard to their serialised size, so a batch of large records exceeds the broker's or the API's maximum payload size. It succeeds for typical records and fails for the larger ones. Failures therefore affect a specific subset of data that testing rarely includes.",
      "Topic / Framework(s)": "Static Performance, AWS Well-Architected",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The batch exceeds a broker or API limit only on large records, so it fails for a subset of users and never in testing."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No trace context propagated through the message",
      "What the Issue Is": "The trace or correlation context is not attached to the message when it is published, and not restored by the consumer, so the distributed trace ends at the producer. Work performed asynchronously appears in no trace. During an incident the asynchronous half of the system is invisible.",
      "Topic / Framework(s)": "Observability, OpenTelemetry, CNCF Cloud Native",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "OpenTelemetry",
      "Why This Matters": "The trace ends at the producer, so asynchronous work is a blind spot during every incident."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Cleanup or purge job with no dry-run and no bounded batch",
      "What the Issue Is": "A job that deletes or purges data runs without a dry-run mode, without a bounded batch size and without a check on how many rows it is about to affect. A mistaken predicate deletes everything matching, at full speed. The job reports success, and the first indication of a problem is missing data.",
      "Topic / Framework(s)": "Google SRE, DORA",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A wrong predicate deletes at full speed, and the first signal is missing data rather than a failed job."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Idempotency key derived from payload content that legitimately repeats",
      "What the Issue Is": "The key used for deduplication is derived from message content that can legitimately repeat, such as a user identifier plus an amount, rather than from a unique event identifier. Genuinely distinct events that happen to look alike are discarded as duplicates. It is a data-loss defect that produces no error and no log line.",
      "Topic / Framework(s)": "AWS Well-Architected, Enterprise Integration Patterns",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Genuine duplicate-looking events are dropped, which is a data-loss bug that no error path reports."
    }
  ],
  "Database & Schema Change": [
    {
      "Code Issue / Anti-Pattern Identified": "Pipeline step is not idempotent, so a rerun double-counts",
      "What the Issue Is": "A pipeline step appends or increments rather than writing a deterministic result for its input partition, so running it twice produces different output. Reruns after a failure are routine in any orchestrator. The resulting number is wrong and indistinguishable from a correct one.",
      "Topic / Framework(s)": "DAMA DMBOK, dbt conventions",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Reruns are routine after any failure, and the corrupted number is indistinguishable from a real one."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Backfill path diverges from the incremental path",
      "What the Issue Is": "The logic used to load history is written separately from the logic that processes each new increment, so the two implementations of the same transformation can differ. Only the incremental path runs daily and gets exercised. The backfill path is trusted precisely when it is used, which is during recovery.",
      "Topic / Framework(s)": "dbt conventions, DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Two code paths compute the same table, and only one of them is exercised daily."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Full refresh and incremental run produce different results",
      "What the Issue Is": "Running the model as a full refresh produces different output from running it incrementally, because of differing filters, deduplication or window boundaries. Both paths are used at different times. The divergence surfaces as an unexplained step change in a metric long after the cause.",
      "Topic / Framework(s)": "dbt conventions",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "dbt tests (partial)",
      "Why This Matters": "The discrepancy surfaces months later as an unexplained step change in a metric."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Schema drift absorbed by an implicit cast instead of a contract check",
      "What the Issue Is": "The pipeline handles an upstream type or field change by casting or coercing rather than by validating against a declared contract and failing. A string that becomes a number, or a number that overflows into a null, passes through silently. The pipeline continues to succeed and its output is wrong.",
      "Topic / Framework(s)": "DAMA DMBOK, Contract Testing",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Great Expectations, Soda",
      "Why This Matters": "Upstream changes a type and the pipeline keeps running while producing wrong values."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No freshness or volume test on a source table",
      "What the Issue Is": "There is no test asserting that a source table has been updated recently and contains a plausible number of rows. When an upstream feed stops, the pipeline runs successfully against yesterday's data. Downstream consumers see a quiet day rather than a broken pipeline.",
      "Topic / Framework(s)": "DAMA DMBOK, Observability",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "dbt source freshness, Elementary, Soda",
      "Why This Matters": "A stopped upstream feed looks identical to a quiet business day until someone checks."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Primary key uniqueness assumed but never asserted",
      "What the Issue Is": "The model or table is treated as having a unique key, and joins and aggregations depend on it, but no constraint or test enforces it. When duplicates appear upstream, every downstream count and sum inflates. The error propagates silently through the whole dependency graph.",
      "Topic / Framework(s)": "DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "dbt tests, Great Expectations",
      "Why This Matters": "Duplicate keys inflate every downstream aggregate, and existing tools assert this in one line."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Late-arriving data ignored, no watermark or grace period",
      "What the Issue Is": "A streaming or windowed aggregation closes its window on event time or processing time with no watermark and no allowance for records that arrive after the window has closed. Late records are dropped rather than counted or diverted. Totals are quietly low with no error raised.",
      "Topic / Framework(s)": "Dataflow model, streaming practice",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Records that arrive after the window closes are dropped without an error, so totals are quietly low."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Streaming aggregation with unbounded state and no eviction",
      "What the Issue Is": "A streaming job accumulates keyed state, such as a per-user aggregate or a join buffer, with no time-to-live and no eviction policy. State grows for as long as the job runs. The job eventually fails on memory or checkpoint size, and restarting loses the aggregate it had built.",
      "Topic / Framework(s)": "Streaming practice, Static Performance",
      "Area / Pillar": "Reliability, Cost",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "State grows until the job dies, and restarting it loses the aggregate it was accumulating."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Partition key derived from local time rather than UTC",
      "What the Issue Is": "The partition column is derived from a timestamp interpreted in a local timezone rather than in UTC. Partition boundaries shift when daylight saving changes, so one day is duplicated and another has a gap. Queries filtering on the partition then silently include or exclude the wrong rows.",
      "Topic / Framework(s)": "DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Partition boundaries shift with DST, producing duplicate and empty partitions on two days a year."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Exploding or unintended cross join",
      "What the Issue Is": "A join condition is missing, too loose, or joins on a non-unique key, so the result set multiplies rather than matching one to one. On sample data the row count looks plausible. On production cardinality the query either runs for hours or exhausts the warehouse.",
      "Topic / Framework(s)": "Static Performance, AWS Well-Architected",
      "Area / Pillar": "Performance, Cost",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "sqlfluff (syntax only)",
      "Why This Matters": "The query is correct on sample data and ruinous on production cardinality."
    },
    {
      "Code Issue / Anti-Pattern Identified": "SELECT * carried through the pipeline, so upstream columns leak downstream",
      "What the Issue Is": "Transformations select all columns rather than naming the ones they need, so every column added upstream automatically flows to every downstream consumer. Nobody reviews what is being propagated, and personal data added upstream can reach systems that were never assessed for it. It also makes the real dependencies impossible to determine.",
      "Topic / Framework(s)": "dbt conventions, Privacy/GDPR",
      "Area / Pillar": "Privacy, Maintainability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "sqlfluff, dbt project evaluator",
      "Why This Matters": "New upstream columns, including personal data, propagate to consumers nobody reviewed."
    },
    {
      "Code Issue / Anti-Pattern Identified": "PII copied into an analytics or development dataset unmasked",
      "What the Issue Is": "Production data containing personal information is copied into an analytics warehouse, a development environment or a sample dataset without masking, tokenisation or removal. The copy does not inherit the access controls, retention rules or deletion capability of the source. Copies are where most data exposure originates.",
      "Topic / Framework(s)": "Privacy/GDPR, NIST SSDF",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Presidio, Great Expectations",
      "Why This Matters": "The copy inherits none of the access controls of the source, and it is usually the copy that leaks."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No column-level lineage, so a breaking change lands blind",
      "What the Issue Is": "There is no record of which downstream models, dashboards and exports depend on a given column, so the effect of changing or dropping it cannot be determined before the change is made. Teams respond by never removing anything. Schemas accumulate columns nobody can prove are unused.",
      "Topic / Framework(s)": "Data Mesh, DAMA DMBOK",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "OpenLineage, dbt docs, SQLLineage",
      "Why This Matters": "Nobody can answer who depends on a column before dropping it, so nothing ever gets dropped."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Business logic duplicated between the warehouse and the application",
      "What the Issue Is": "The same business rule, such as how revenue is recognised or how an active user is defined, is implemented once in the application and again in the warehouse. The two are maintained by different people and drift apart. Each side is confident its number is correct.",
      "Topic / Framework(s)": "Data Mesh, Clean Architecture",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Two definitions of the same rule drift, and each side is convinced the other is wrong."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Hardcoded warehouse, dataset or bucket name in transformation code",
      "What the Issue Is": "Warehouse, dataset, schema or bucket names are written as literals in transformation code rather than resolved from the environment. The same code cannot run against development and production. It is also a common cause of a development run writing into production tables.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "sqlfluff, Semgrep, dbt project evaluator",
      "Why This Matters": "Environments cannot be separated, and a development run writes into production."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Small-file explosion in object storage with no compaction step",
      "What the Issue Is": "A streaming or micro-batch writer produces many small files in object storage with no compaction step. Query planning cost scales with the number of files rather than the volume of data. The same query gets slower every day without any change to the query or the data model.",
      "Topic / Framework(s)": "Iceberg/Delta practice, Static Performance",
      "Area / Pillar": "Performance, Cost",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Query planning cost grows with file count, so the table gets slower every day without any change to the query."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Table scanned without a partition or cluster predicate",
      "What the Issue Is": "A query reads a partitioned or clustered table without a predicate on the partitioning column, so the engine scans the entire history. The result is correct and the cost is not. In a consumption-priced warehouse this appears on the bill rather than as a failure.",
      "Topic / Framework(s)": "AWS Well-Architected, Static Performance",
      "Area / Pillar": "Cost, Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A dashboard refresh scans the full history, and the cost appears on the warehouse bill rather than in a failure."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No retention or deletion policy on raw event tables",
      "What the Issue Is": "Raw event and log tables have no retention policy and no deletion routine, so they accumulate indefinitely. Storage cost grows without bound, and personal data within them outlives the basis on which it was collected. Deletion requests cannot be satisfied because the data has no lifecycle.",
      "Topic / Framework(s)": "Privacy/GDPR, FinOps",
      "Area / Pillar": "Privacy, Cost",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Storage grows without bound and personal data outlives the lawful basis for keeping it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Orchestration dependencies expressed as sleeps or task ordering",
      "What the Issue Is": "Tasks in the orchestration graph are ordered by a wait, a fixed schedule offset or a manually declared sequence, rather than by an explicit dependency on the upstream task's completion. It works while the upstream job is fast. When it is slow once, the downstream task reads partial data and succeeds.",
      "Topic / Framework(s)": "Airflow practice, DORA",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The DAG works until an upstream job is slow once, and then it silently reads incomplete input."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Orchestrator retries wrap a non-idempotent write",
      "What the Issue Is": "The orchestrator is configured to retry a failed task whose work is not idempotent, such as an append or an external API call. The retry is intended as resilience and produces duplication. Partial completion before the failure is not detected.",
      "Topic / Framework(s)": "Release It!, AWS Well-Architected",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The retry is configured for resilience and delivers duplication instead."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No data quality gate between the staging and published layers",
      "What the Issue Is": "There is no assertion between the staging layer and the published layer that the data is within expected bounds for row count, null rate, distribution or referential integrity. Whatever arrives is published. Consumers discover the problem before the data team does.",
      "Topic / Framework(s)": "DAMA DMBOK, DORA",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Great Expectations, Soda, dbt tests",
      "Why This Matters": "Bad data reaches dashboards and downstream models before anyone inspects it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "The same metric name defined differently in two places",
      "What the Issue Is": "The same named metric is computed in two dashboards, two models or a dashboard and a report, with different filters or denominators. Both are labelled the same and both are wrong to somebody. Meetings then become about reconciling the numbers rather than acting on them.",
      "Topic / Framework(s)": "Data Mesh, DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "dbt metrics, Cube",
      "Why This Matters": "Two teams present contradictory numbers and the meeting becomes about the data rather than the decision."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Historical rows mutated in place with no snapshot or slowly-changing dimension",
      "What the Issue Is": "Historical rows are updated in place when the source record changes, with no snapshot table and no slowly-changing-dimension handling. Reports run today no longer reproduce results from last month, because the history they were computed against has been overwritten. The audit trail is lost without any error.",
      "Topic / Framework(s)": "DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "dbt snapshots",
      "Why This Matters": "Past reports stop reproducing, which destroys the audit trail without any error being raised."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Alerting on task failure only, not on silent empty or partial output",
      "What the Issue Is": "Alerting is wired to task failure, so a job that runs successfully and produces zero rows, or a fraction of the expected rows, raises nothing. Silent partial output is the most damaging pipeline failure because downstream consumers treat it as valid. The check needed is on the output, not on the exit code.",
      "Topic / Framework(s)": "Observability, Google SRE",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Elementary, Soda",
      "Why This Matters": "The worst pipeline failures are the ones that succeed and produce nothing."
    }
  ],
  "Test Suite Health": [
    {
      "Code Issue / Anti-Pattern Identified": "Test asserts a mock was called with certain arguments rather than a behaviour",
      "What the Issue Is": "The test replaces a collaborator with a mock and then asserts that the mock was called with particular arguments, rather than asserting anything about the result or the observable state. It is a restatement of the implementation in a second syntax. Changing how the code achieves the same outcome breaks the test, and a genuine defect in the outcome does not.",
      "Topic / Framework(s)": "xUnit Test Patterns, DORA",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The test restates the implementation, so it passes for wrong code and breaks on correct refactors."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Test mocks a framework, driver or SDK the team does not own",
      "What the Issue Is": "The test creates a fake for something the team does not own, such as an HTTP client, a database driver, a cloud SDK or a framework class. The fake encodes an assumption about how that dependency behaves, and nothing verifies the assumption. The test passes when the assumption is wrong, which is exactly the case that matters.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The fake encodes an assumption about someone else's behaviour, and it only ever agrees with itself."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Test passes because the fake agrees with the implementation",
      "What the Issue Is": "The fake and the code under test were written together and share the same misunderstanding, so the test confirms the implementation rather than the requirement. Coverage tools report the code as tested. Mutation testing exposes it, because deliberately breaking the logic still leaves the suite green.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Mutation testing: PIT, Stryker, mutmut",
      "Why This Matters": "Coverage looks healthy while no defect in the logic would ever fail the suite."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Test with no assertion, or an assertion that cannot fail",
      "What the Issue Is": "The test executes the code but makes no assertion, or asserts something that is true regardless of behaviour, such as that a result is not null when the method cannot return null. It contributes to the coverage figure and verifies nothing. Linters detect the shape of it directly.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "PMD, SonarQube, ESLint assertion rules",
      "Why This Matters": "It counts toward coverage and verifies nothing, and standard linters flag it directly."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Assertion on a value the test computed using the implementation's own logic",
      "What the Issue Is": "The expected value in the assertion is computed by calling the same logic that is under test, or by duplicating its formula in the test. Any error in that logic appears identically on both sides of the comparison. The test can only fail if the code is inconsistent with itself.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The expected value is derived from the code under test, so any bug is reproduced on both sides."
    },
    {
      "Code Issue / Anti-Pattern Identified": "sleep used to wait for asynchronous completion",
      "What the Issue Is": "The test calls sleep to wait for an asynchronous operation to finish, rather than awaiting a completion signal or controlling the clock. The duration chosen is a guess, so the suite is slower than necessary when it passes and fails when the machine is loaded. Both problems are removed by injecting the clock or waiting on the actual condition.",
      "Topic / Framework(s)": "DORA, test flakiness practice",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, ESLint, PMD",
      "Why This Matters": "The suite is slow when it passes and flaky when the machine is busy, so inject the clock or await a condition instead."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Test depends on the real system clock or the current date",
      "What the Issue Is": "The test reads the current time or date from the system rather than from an injected clock. It then behaves differently at month ends, across timezones, during daylight saving transitions or after a year has passed. The failure appears in someone else's build long after the test was written.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Semgrep (partial)",
      "Why This Matters": "It fails on a boundary date, in another timezone, or in a year's time, and always in someone else's build."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Test reaches the real network or a shared environment",
      "What the Issue Is": "The test makes a real network call or depends on a shared database, queue or environment that other tests and other people also use. Its result depends on infrastructure the test does not control. A failing build stops being evidence that a change is broken.",
      "Topic / Framework(s)": "DORA, Test Pyramid",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep, network-blocking test runners",
      "Why This Matters": "The result depends on infrastructure the test does not control, so a red build stops meaning a broken change."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Shared mutable fixture leaks state between tests",
      "What the Issue Is": "Tests share a fixture, a static field, a database or a singleton that one test mutates and another reads. They pass when run in one order and fail in another, including when the runner parallelises them. The cause sits in a test that appears unrelated to the one that fails.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Tests pass in one order and fail in another, and the cause sits in a file nobody suspects."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Coverage concentrated on adapters, absent on domain logic",
      "What the Issue Is": "The test suite concentrates on controllers, repositories and other adapters, where behaviour is thin and mocking is heavy, and leaves the domain and service logic that encodes the actual rules comparatively untested. The overall coverage percentage looks healthy. The code where defects are most costly has the least protection.",
      "Topic / Framework(s)": "Test Pyramid, DORA",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Coverage tools plus manual mapping",
      "Why This Matters": "The percentage is reassuring while the code that actually encodes the rules is untested."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Test named after the method rather than the behaviour it pins",
      "What the Issue Is": "The test is named after the function it calls rather than the behaviour it protects, for example testUpdate rather than a description of what should happen. A failure report then tells you which function broke and not what stopped working. Every diagnosis begins by reading the test body.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A failure report says which function broke and not what stopped working, which slows every diagnosis."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Test that breaks on a rename or an internal refactor",
      "What the Issue Is": "The test reaches into private fields, calls internal methods, or depends on the specific class and method names the implementation happens to use. A rename or an internal restructure breaks it even though behaviour is unchanged. The suite then discourages the refactoring it was supposed to enable.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Coupling to internals makes the suite a tax on change instead of a safety net for it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Skipped, disabled or quarantined test with no ticket and no expiry",
      "What the Issue Is": "A test is annotated as skipped, disabled or quarantined without a linked issue and without a date by which it must be restored. The intention is always to come back to it. In practice the coverage gap becomes permanent and nobody remembers what the test protected.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "ESLint, PMD, SonarQube",
      "Why This Matters": "The gap becomes permanent, and existing linters already report every skip marker."
    },
    {
      "Code Issue / Anti-Pattern Identified": "The same branch covered redundantly at unit, integration and end-to-end level",
      "What the Issue Is": "The same rule is verified by a unit test, again by an integration test and again by an end-to-end test, without a deliberate decision about which level owns it. Changing the rule then requires editing three places, and a failure appears three times. Suites become expensive to maintain and slow to run for no additional confidence.",
      "Topic / Framework(s)": "Test Pyramid",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every change to that rule requires three edits, which is how suites become too expensive to maintain."
    },
    {
      "Code Issue / Anti-Pattern Identified": "End-to-end test used to cover logic that is a pure function",
      "What the Issue Is": "Logic that is a pure function of its inputs, such as a calculation or a validation rule, is covered by driving the whole application through a browser or a device. Feedback takes minutes instead of milliseconds, and the failure message describes a UI symptom rather than the rule. The same coverage is available at a fraction of the cost.",
      "Topic / Framework(s)": "Test Pyramid, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Feedback takes minutes instead of milliseconds and the failure message points at the browser rather than the rule."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Setup so large the test cannot be read without opening three other files",
      "What the Issue Is": "The arrangement section of the test spans dozens of lines or delegates to helpers in several other files, so understanding what is being tested requires navigating the codebase. The test stops functioning as documentation. Nobody is confident enough about what it asserts to change it.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A test that cannot be read at a glance is not documentation, and nobody trusts it enough to change it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Random or generated data used without a fixed or reported seed",
      "What the Issue Is": "The test generates random values, or uses a data generation library, without pinning or reporting the seed. When it fails, the input that caused the failure cannot be recovered. The failure is treated as flakiness and the test is rerun until it passes.",
      "Topic / Framework(s)": "Property testing practice",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, framework lint rules",
      "Why This Matters": "A failure cannot be reproduced, so it gets rerun until green."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Only the happy path asserted, error and failure paths untested",
      "What the Issue Is": "Tests cover the case where everything succeeds and not the cases where a dependency fails, input is invalid, or a permission is missing. Error-handling code is written once, rarely reviewed and never executed by the suite. It is therefore the code most likely to be wrong at the moment it runs.",
      "Topic / Framework(s)": "DORA, CWE Top 25",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Coverage tools (partial)",
      "Why This Matters": "Error handling is the code most likely to be wrong and least likely to be exercised before an incident."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Boundary, empty-collection and null-input cases absent",
      "What the Issue Is": "There are no tests for empty collections, single-element collections, zero, negative numbers, maximum values, or null and absent inputs. Implementations are written against the typical case and defects cluster at the edges. These are the inputs that reach production and are not in the test data.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The defects that reach production cluster at exactly these boundaries."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No timeout on the test suite, so a hang blocks CI until the runner is killed",
      "What the Issue Is": "The test runner has no per-test or overall timeout, so a deadlock or an unbounded wait blocks the build until the CI system's own limit terminates it. A single hanging test consumes an agent for the maximum duration. The failure is reported as infrastructure flakiness rather than as a defect.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Test runner configuration checks",
      "Why This Matters": "A single deadlock consumes the CI queue and the failure looks like infrastructure flakiness."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Assertions made on log output or on private fields",
      "What the Issue Is": "The test asserts on the text of a log line, on a private field, or on some other detail that was never part of the unit's contract. Ordinary changes such as improving a message break the build. The test constrains the implementation rather than protecting the behaviour.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The test pins something that was never a contract, so ordinary cleanup breaks the build."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No test data builder, every test constructs objects by hand",
      "What the Issue Is": "Every test constructs its objects by calling constructors or setters directly with full argument lists. Adding a required field then requires editing every test that builds that object. The resulting diff is large enough to hide the one behavioural change that actually matters.",
      "Topic / Framework(s)": "xUnit Test Patterns",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A constructor change touches hundreds of tests, and the noise hides the one real behavioural break."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Contract test replaced by a hand-written stub that drifts from the provider",
      "What the Issue Is": "Instead of a contract verified against the real provider, the consumer's tests use a hand-written stub of the provider's responses. The stub is correct on the day it is written and is not updated when the provider changes. The consumer's build stays green while the integration is already broken.",
      "Topic / Framework(s)": "Contract Testing, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Pact, Specmatic",
      "Why This Matters": "The consumer's tests stay green while the integration is already broken in the shared environment."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Flaky test rerun automatically with no tracking of the flake rate",
      "What the Issue Is": "A test known to fail intermittently is handled by configuring the runner to retry it, with no record of how often it fails or why. The retry hides a real defect, which is often a race condition in the code rather than in the test. It also normalises the idea that a red build can be ignored.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Flaky-test detectors, CI insights",
      "Why This Matters": "Auto-rerun hides a real intermittent defect and trains the team to ignore red builds."
    }
  ],
  "Data & Analytics Pipelines": [
    {
      "Code Issue / Anti-Pattern Identified": "Column renamed or dropped without a backward-compatible window",
      "What the Issue Is": "A column is renamed or removed in one migration, and the application code is changed in the same release to match. During a rolling deploy both versions of the code run against the changed schema, and the version that does not match it fails. The safe sequence is to add the new column, write to both, migrate readers, then remove the old one in a later release.",
      "Topic / Framework(s)": "Release It!, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Old and new application versions run at once during a rollout, and one of them breaks."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Index created without the concurrent option on a live table",
      "What the Issue Is": "An index is created with a statement that takes an exclusive lock on the table for the duration of the build, rather than using the engine's concurrent or online option. On a large table the lock lasts long enough for every query against it to time out. The statement is syntactically identical to a harmless one on a small table.",
      "Topic / Framework(s)": "Google SRE, Static Performance",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Squawk, Atlas lint",
      "Why This Matters": "The write lock stalls the application for the duration of the build, and a linter catches the statement shape directly."
    },
    {
      "Code Issue / Anti-Pattern Identified": "NOT NULL added without a default and a backfill phase",
      "What the Issue Is": "A NOT NULL constraint is added to an existing column in a single statement, without first adding a default and backfilling existing rows. Depending on the engine and version this rewrites the entire table under lock. The migration passes instantly against an empty development database.",
      "Topic / Framework(s)": "DORA, Release It!",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Squawk",
      "Why This Matters": "The rewrite locks the table, and existing migration linters already reject this."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Foreign key added without a NOT VALID plus VALIDATE phase",
      "What the Issue Is": "A foreign key constraint is added in one statement, so the engine validates every existing row while holding a lock. The duration scales with table size. Splitting it into an unvalidated add and a separate validation pass avoids the lock without changing the end state.",
      "Topic / Framework(s)": "Static Performance",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Squawk",
      "Why This Matters": "Validation takes a lock proportional to table size, which is fine in staging and not in production."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Migration with no down path and no rehearsed rollback",
      "What the Issue Is": "A migration is written to move forward with no corresponding reverse migration, and the reverse path has never been executed against realistic data even where one exists. When a release must be rolled back, the schema cannot be. The only remaining option is to fix forward while the incident continues.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A bad release cannot be reverted, so the only option left is fixing forward under incident pressure."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Schema change and data backfill in the same transaction",
      "What the Issue Is": "A single migration both alters the schema and backfills existing rows, inside one transaction. Locks acquired by the schema change are held for the whole duration of the backfill, which scales with the table. A change that would take milliseconds becomes an outage lasting as long as the data load.",
      "Topic / Framework(s)": "Release It!",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The transaction holds locks for the duration of the backfill, turning a schema change into an outage."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Backfill runs unbounded rather than in bounded batches",
      "What the Issue Is": "A backfill updates or deletes all matching rows in one statement rather than in bounded batches with pauses between them. It generates a large transaction, long lock durations and replication lag proportional to the data volume. Once started it cannot be paused or throttled without aborting and rolling back.",
      "Topic / Framework(s)": "Google SRE",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Replication lag and lock contention scale with the table, and the job cannot be paused once started."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Migrations not ordered deterministically across branches",
      "What the Issue Is": "Migrations are ordered by timestamp or sequence number assigned when they were written, so two branches developed in parallel produce migrations whose relative order depends on when they merge. The resulting schema differs between environments that applied them in different orders. Neither branch is wrong on its own.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Migration tool ordering checks",
      "Why This Matters": "Two branches merge and the resulting schema depends on merge order rather than intent."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Schema changed by hand in production, drifting from the migration history",
      "What the Issue Is": "A schema change is applied directly to production during an incident or a maintenance window and is not added to the migration history. Production and the migration history now describe different schemas. The next migration is written against the history and fails only in production.",
      "Topic / Framework(s)": "DORA",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "migra, Atlas diff, Liquibase diff",
      "Why This Matters": "The migration history stops describing reality, so the next migration fails on production only."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Transaction isolation level assumed rather than stated",
      "What the Issue Is": "Code that depends on a particular isolation level, such as assuming that a read within a transaction cannot see concurrent commits, does not set it explicitly and relies on the engine default. Defaults differ between engines and between managed service configurations. The same code is correct in one environment and produces subtle corruption in another.",
      "Topic / Framework(s)": "CWE Top 25, Static Performance",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The code is correct under one engine's default and wrong under another, which surfaces as rare data corruption."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Read-modify-write without row locking or a version column",
      "What the Issue Is": "Two concurrent transactions read a row, compute a new value from it and write it back, with no SELECT FOR UPDATE, no conditional update and no version column. The later write overwrites the earlier one entirely. No error is raised and the loss is only detectable by comparing against what the user submitted.",
      "Topic / Framework(s)": "CWE Top 25",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Concurrent updates silently overwrite each other, and the lost update leaves no error behind."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Long transaction spanning user think time",
      "What the Issue Is": "A transaction is opened before an interaction that waits on a human or an external system and is committed after it, so locks and a connection are held for seconds or minutes. Concurrency is then bounded by human response time rather than by the database. It also makes deadlocks far more likely.",
      "Topic / Framework(s)": "Static Performance, Release It!",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Locks and connections are held for human-scale durations, which caps concurrency far below the hardware."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Query built by string concatenation of user input",
      "What the Issue Is": "SQL is assembled by concatenating or interpolating values that originate from a request, rather than using bound parameters. The input becomes part of the statement rather than data within it. It remains one of the most reliably exploited defect classes and one of the most reliably detected by scanners.",
      "Topic / Framework(s)": "OWASP, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, CodeQL, SonarQube",
      "Why This Matters": "Classic injection, and every mainstream scanner detects it more cheaply than an agent."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Soft-delete column not applied consistently across queries",
      "What the Issue Is": "Rows are marked deleted with a flag rather than removed, and the predicate excluding them is applied in most queries but not all, usually because it is added by a base class or scope that some paths bypass. Deleted records then appear on some screens and reports. Every query has to be audited to find the omissions.",
      "Topic / Framework(s)": "Static Performance, DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Deleted rows reappear in one screen and not another, and finding every missed predicate needs a repository-wide read."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Enum persisted as an ordinal, so reordering corrupts existing rows",
      "What the Issue Is": "An enumeration is persisted as its ordinal position rather than as a stable string or code. Reordering the enum in source, or inserting a new value in the middle, silently changes the meaning of every previously stored row. The source change looks entirely harmless in review.",
      "Topic / Framework(s)": "CWE Top 25",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A harmless-looking source edit silently rewrites the meaning of stored data."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Nullable column relied on for business meaning with no constraint",
      "What the Issue Is": "A column is left nullable and null is used to carry meaning, such as not yet set, not applicable or unknown, with no constraint or documentation distinguishing the cases. Different parts of the application interpret it differently. Aggregations and joins then behave inconsistently for reasons that are invisible in the schema.",
      "Topic / Framework(s)": "DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Null is asked to mean several different things, and each caller picks a different interpretation."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Unbounded text or JSON column used as a schema escape hatch",
      "What the Issue Is": "A large text or JSON column is used to hold structured data so that the schema does not have to change when fields are added. The structure moves into application code and nothing validates it. Different versions of the application then write different shapes into the same column.",
      "Topic / Framework(s)": "DAMA DMBOK, Static Performance",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Structure moves out of the database and into scattered application assumptions that nothing validates."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Composite index column order mismatched with the query predicate",
      "What the Issue Is": "A composite index exists but its column order does not match how queries filter, so the engine cannot use it for the predicate. The index appears in the schema and in any audit of whether the table is indexed. Query plans show it being ignored, which nobody looks at until performance degrades.",
      "Topic / Framework(s)": "Static Performance",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "pgHero, index advisors",
      "Why This Matters": "The index exists, the plan ignores it, and the dashboard reports that the table is indexed."
    },
    {
      "Code Issue / Anti-Pattern Identified": "ORM relation loaded eagerly by default across a hot path",
      "What the Issue Is": "An ORM relationship is configured to load eagerly by default, so every query that touches the parent also loads the related data whether or not it is used. Adding a field to a model then increases query volume across every endpoint that reads it. The cost is invisible at each individual call site.",
      "Topic / Framework(s)": "Static Performance",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "One extra field on a model multiplies query volume across every endpoint that touches it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Read replica used on a read-after-write path",
      "What the Issue Is": "A write is followed by a read that is routed to a read replica, which may not yet have received the change. The user performs an action and does not see its effect. It cannot be reproduced when replication lag is low, which is most of the time in testing.",
      "Topic / Framework(s)": "AWS Well-Architected, Static Performance",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The user does not see their own change, and the bug reproduces only under replication lag."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Connection acquired per query rather than per unit of work",
      "What the Issue Is": "A connection is taken from the pool and returned around each individual statement rather than being held for a logical unit of work. The related statements then run on different connections and cannot be part of one transaction. Pool churn also limits throughput at higher concurrency.",
      "Topic / Framework(s)": "Static Performance, Release It!",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Pool churn caps throughput and makes a single logical operation non-atomic."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No statement timeout or lock timeout configured",
      "What the Issue Is": "The database session has no statement timeout and no lock timeout, so a query that will never finish, or one waiting on a lock that is never released, blocks indefinitely. It holds its own locks while waiting, which blocks others in turn. A single pathological query can therefore stop the entire service.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Squawk (partial), configuration review",
      "Why This Matters": "One pathological query holds locks indefinitely and takes the whole service with it."
    }
  ],
  "CI/CD & Supply Chain": [
    {
      "Code Issue / Anti-Pattern Identified": "Workflow triggered by pull_request_target while checking out the untrusted head ref",
      "What the Issue Is": "A workflow uses a trigger that grants access to repository secrets and a writable token, and then checks out the code from the pull request being tested. Code contributed by anyone who can open a pull request runs with those credentials. The two settings are individually reasonable and dangerous only in combination.",
      "Topic / Framework(s)": "SLSA, OWASP, platform hardening guides",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "zizmor, actionlint",
      "Why This Matters": "Fork code executes with repository secrets, and dedicated workflow linters detect this pattern directly."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Secrets exposed to workflows triggered from forks",
      "What the Issue Is": "Repository or organisation secrets are made available to builds triggered by forks, so any contributor can read them by adding a step that prints or exfiltrates them. Fork builds are intended for untrusted code. The credentials involved are usually the most privileged the organisation has.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "zizmor",
      "Why This Matters": "Anyone who can open a pull request can read production credentials."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Third-party action referenced by tag or branch rather than commit SHA",
      "What the Issue Is": "A third-party action or shared pipeline template is referenced by a version tag or a branch name rather than a commit hash. Tags are mutable, so the code that was reviewed can be replaced with different code under the same reference. Nothing in your repository changes when it happens.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "zizmor, Dependabot, ratchet",
      "Why This Matters": "A tag can be moved after review, so the code you audited is not the code that runs."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Untrusted input interpolated into a shell step, enabling script injection",
      "What the Issue Is": "A workflow interpolates values controlled by an outside contributor, such as a branch name, a pull request title or an issue body, into a shell command. The value is substituted before the shell parses the command, so shell metacharacters in it become executable. It is command injection with the build environment's credentials.",
      "Topic / Framework(s)": "OWASP, SLSA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "zizmor, actionlint",
      "Why This Matters": "A branch name or issue title becomes command execution on the build host."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Build cache key shared between trusted and untrusted jobs",
      "What the Issue Is": "Trusted and untrusted jobs read and write the same build cache key, so a job running contributor code can write entries that a later release build restores and uses. The poisoned content enters the artifact without appearing in any diff. Cache restore steps are rarely examined in review.",
      "Topic / Framework(s)": "SLSA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A fork job poisons the cache that a release job later trusts, and nothing in the logs shows it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Release job can run without the test job having passed",
      "What the Issue Is": "The job that publishes or deploys does not declare a dependency on the job that runs tests, so it can execute even when tests fail or are skipped. The pipeline diagram shows a gate that the dependency graph does not enforce. Untested code reaches production through a path nobody intended to leave open.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The gate exists on the diagram and not in the dependency graph, so untested code can ship."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Deployment credentials long-lived rather than short-lived and federated",
      "What the Issue Is": "Deployment uses a long-lived static access key stored as a secret rather than short-lived credentials issued per run through OIDC federation. If the key leaks it remains valid until someone notices and rotates it. Rotation is manual, so in practice it happens rarely.",
      "Topic / Framework(s)": "Zero Trust, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Checkov, zizmor",
      "Why This Matters": "A leaked static key stays valid until someone notices and rotates it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Artifact rebuilt for each environment instead of promoted",
      "What the Issue Is": "The pipeline builds a separate artifact for each environment, typically by baking environment configuration into the build. The binary tested in staging is not the binary that runs in production. Any difference between them is exactly where an incident will originate.",
      "Topic / Framework(s)": "Twelve-Factor App, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "What was tested is not what is deployed, and the difference is exactly where the incident lives."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Version derived from a mutable branch pointer rather than an immutable tag or SHA",
      "What the Issue Is": "The version applied to an artifact is derived from a branch name or another mutable reference rather than from a tag or commit hash. Two different builds can carry the same version. Rolling back to a specific known-good build then cannot be expressed precisely.",
      "Topic / Framework(s)": "SLSA, DORA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A rollback cannot be expressed precisely because the version does not identify a single build."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Pipeline reports green while a required check was skipped by a path filter",
      "What the Issue Is": "Required checks are configured with path filters, so a change that does not touch the filtered paths reports success without the check having run. A skipped check and a passing check are visually identical in the merge interface. The gap is never noticed because nothing appears to be missing.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The signal is indistinguishable from a passing check, so the gap is never noticed."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Lockfile absent, or the install command allowed to resolve fresh versions",
      "What the Issue Is": "Dependencies are installed with a command that resolves versions afresh rather than honouring a committed lockfile, or no lockfile is committed at all. Two builds of the same commit can then contain different code. An upstream release reaches production without any review or any change in your repository.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "npm ci and pip-compile checks, Renovate",
      "Why This Matters": "Builds stop being reproducible and a transitive change ships without review."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Package lifecycle or post-install scripts allowed to run unrestricted",
      "What the Issue Is": "Package manager lifecycle hooks, such as post-install scripts, are permitted to run during dependency installation. Any package in the transitive tree can execute arbitrary code on the build machine with access to its credentials and its network. The trust placed in a direct dependency extends to everything it depends on.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Install-script policy flags, Socket",
      "Why This Matters": "Arbitrary code from any transitive dependency runs on the build machine with its credentials."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Internal package name shadowable from a public registry",
      "What the Issue Is": "An internal package name is not scoped or reserved on the public registry that the resolver also consults, so a package with the same name published publicly can be resolved in preference to the private one. Detecting this requires knowing both the private naming convention and the resolver's ordering. It is a well-established supply chain attack.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Dependency confusion needs knowledge of both the private naming scheme and the resolver's order, which is cross-file reasoning."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Base image pulled by a mutable tag in the build stage",
      "What the Issue Is": "The Dockerfile or build definition references a base image by a mutable tag rather than by digest. The contents behind that tag change over time, so the build is not reproducible and an upstream compromise is inherited automatically. Nothing in your repository records which image was actually used.",
      "Topic / Framework(s)": "SLSA, CNCF Cloud Native",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Hadolint, Trivy, dockerfile-lint",
      "Why This Matters": "The build is not reproducible and a compromised upstream tag lands silently."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Build not reproducible, timestamps or host paths baked into the artifact",
      "What the Issue Is": "Build outputs embed values that vary between runs, such as timestamps, absolute paths, hostnames or non-deterministic ordering. Two builds from identical source therefore differ. Any provenance or attestation claim about the artifact cannot be independently verified.",
      "Topic / Framework(s)": "SLSA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "diffoscope, reprotest",
      "Why This Matters": "Provenance claims cannot be verified because two builds of the same source differ."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Test or lint failures downgraded to warnings to keep the pipeline green",
      "What the Issue Is": "Failing tests or lint rules are configured to report a warning rather than fail the build, usually as a temporary measure during a migration. The check still consumes build time and no longer prevents anything. The condition it was created to catch now reaches production unimpeded.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The check still runs, still costs time, and no longer stops anything."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Deploy step with no health gate and no automatic rollback trigger",
      "What the Issue Is": "The deployment step completes when the new version has been rolled out, with no verification against health, error rate or latency, and no automatic rollback if those degrade. Detection depends on a human noticing a dashboard or a customer reporting a problem. Time to recovery is bounded below by human reaction time.",
      "Topic / Framework(s)": "DORA, Google SRE",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Detection depends on a human watching a dashboard, which sets the floor on time to recovery."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Migration and deploy steps have no defined ordering across replicas",
      "What the Issue Is": "The schema migration and the application deployment are separate steps with no defined ordering relative to the rolling replacement of instances. During the rollout some instances run against a schema they were not built for. The outcome depends on timing, so it differs between environments and between runs.",
      "Topic / Framework(s)": "DORA, Release It!",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "During a rolling update some instances run against a schema they were not built for."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Pipeline definition differs between staging and production",
      "What the Issue Is": "Staging and production are deployed by different pipelines, different scripts or different parameters, which have diverged over time. A successful staging deployment therefore says less about production than it appears to. The value of having a staging environment depends entirely on the two being the same.",
      "Topic / Framework(s)": "Twelve-Factor App, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Staging stops being evidence about production, which is the only reason staging exists."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Branch protection bypassable by the automation account",
      "What the Issue Is": "Branch protection rules apply to human contributors but the bot or service account used by automation is exempt, either explicitly or by holding administrative rights. Most changes reach the protected branch through that account. The control is documented and not enforced where it matters most.",
      "Topic / Framework(s)": "NIST SSDF, DORA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Platform policy checks",
      "Why This Matters": "The control is documented and unenforced for the identity that pushes most often."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Signing key or registry credential scoped to the whole organisation",
      "What the Issue Is": "A signing key, registry credential or deployment role is shared across the whole organisation rather than scoped per team, per repository or per artifact. A compromise in any one pipeline can publish or deploy anything. Blast radius is set by the scope of the credential rather than by the scope of the breach.",
      "Topic / Framework(s)": "Zero Trust, SLSA",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Checkov, platform policy checks",
      "Why This Matters": "One compromised pipeline can publish on behalf of every team."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Pipeline duration and flake rate unmeasured",
      "What the Issue Is": "There is no measurement of how long pipelines take, how often they fail for reasons unrelated to the change, or how much of the time is spent waiting. Delivery speed degrades gradually and nobody can point at where. Improvement work cannot be justified without the data.",
      "Topic / Framework(s)": "DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Delivery slows gradually with no data to argue for fixing it."
    }
  ],
  "IaC, Kubernetes & Cloud": [
    {
      "Code Issue / Anti-Pattern Identified": "Security group or firewall rule open to 0.0.0.0/0 on a management port",
      "What the Issue Is": "A security group, firewall rule or network ACL permits inbound traffic from any address to a port used for administration or database access, such as SSH, RDP or a database listener. The service is directly reachable from the internet and is scanned within minutes of being created. It is a single line in the configuration and is one of the most commonly exploited misconfigurations.",
      "Topic / Framework(s)": "AWS Well-Architected, Zero Trust, CIS Benchmarks",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Checkov, tfsec, Terrascan, Trivy",
      "Why This Matters": "Direct internet exposure of admin surfaces, and every IaC scanner reports it as a single-line rule."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Storage bucket public, or created without default encryption",
      "What the Issue Is": "An object storage bucket is created with public read or write access, or without server-side encryption enabled by default. Public buckets have been the source of a large share of publicly disclosed data exposures. Both settings are explicit attributes that a scanner can evaluate without any context.",
      "Topic / Framework(s)": "AWS Well-Architected, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Checkov, tfsec, Terrascan",
      "Why This Matters": "The most common cause of public data exposure, and fully deterministic to detect."
    },
    {
      "Code Issue / Anti-Pattern Identified": "IAM policy with a wildcard action or resource",
      "What the Issue Is": "An IAM policy grants an action or resource using a wildcard rather than enumerating what the workload actually calls. The permission granted is much wider than the code exercises. Any compromise of the workload, or any mistake in it, operates with the full granted scope.",
      "Topic / Framework(s)": "Zero Trust, AWS Well-Architected",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Checkov, IAM policy analyzers",
      "Why This Matters": "Least privilege is stated as a principle and contradicted in the file that actually grants access."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Terraform state stored without locking, versioning or encryption",
      "What the Issue Is": "Terraform state is stored in a backend without state locking, without object versioning and without encryption at rest. Concurrent applies then corrupt the state file, and there is no earlier version to restore. Recovery involves manually reconstructing a JSON document that describes live infrastructure.",
      "Topic / Framework(s)": "AWS Well-Architected, DORA",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Checkov, tfsec",
      "Why This Matters": "Concurrent applies corrupt state, and the recovery path is manual surgery on a JSON file."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Secrets passed as plain variables or committed tfvars",
      "What the Issue Is": "Credentials are passed as ordinary Terraform variables or committed in a tfvars file, so they appear in the repository and in the state file, which is itself often stored with weaker controls than a secret manager. Removing the line later does not remove it from history or from state. The secret has to be treated as compromised.",
      "Topic / Framework(s)": "NIST SSDF, OWASP",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Gitleaks, TruffleHog, Checkov",
      "Why This Matters": "Credentials enter version control history where deletion does not remove them."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Resource created outside IaC, so plan and reality diverge",
      "What the Issue Is": "Infrastructure is created or modified by hand in a console or CLI rather than through the IaC definition, so the declared state and the real state diverge. The next apply either fails against unexpected reality or silently reverts the manual change, which was often an incident fix. Neither outcome is discovered until the apply runs.",
      "Topic / Framework(s)": "DORA",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "driftctl, terraform plan in CI",
      "Why This Matters": "The next apply either fails or silently reverts a manual fix made during an incident."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Apply run without a reviewed plan artifact",
      "What the Issue Is": "Changes are applied directly rather than by generating a plan, having it reviewed, and applying that exact plan. Nobody sees what will be destroyed before it is destroyed. The difference between an intended change and a catastrophic one is frequently a single line in the plan output.",
      "Topic / Framework(s)": "DORA, CI/CD",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Atlantis, OPA/Conftest",
      "Why This Matters": "Nobody sees the destroy count before it happens."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Module hardcodes an account, region or environment",
      "What the Issue Is": "A module contains a hardcoded account identifier, region, environment name or CIDR block, so it cannot be instantiated for another environment. Teams respond by copying the module rather than parameterising it. The copies then diverge and fixes are applied to only some of them.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "tflint",
      "Why This Matters": "The module cannot be reused, so it gets copied, and the copies drift."
    },
    {
      "Code Issue / Anti-Pattern Identified": "count or for_each keyed by list index, so reordering destroys resources",
      "What the Issue Is": "Resources are created with count and indexed by position in a list, so inserting or removing an element shifts every subsequent index. Terraform interprets the shift as destroying and recreating those resources. For stateful resources this is data loss, and the plan discloses it only to a reader who checks the resource addresses.",
      "Topic / Framework(s)": "Terraform practice",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Adding an item in the middle of a list recreates unrelated infrastructure, which the plan shows only if someone reads it carefully."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No deletion protection or prevent_destroy on stateful resources",
      "What the Issue Is": "Databases, storage buckets and other stateful resources are declared without deletion protection or a lifecycle rule preventing destruction. A refactor that changes a resource's address in the configuration is then interpreted as a destroy and create. The data is gone before anyone reads the plan carefully.",
      "Topic / Framework(s)": "AWS Well-Architected",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Checkov, OPA/Conftest",
      "Why This Matters": "A refactor that changes a resource address deletes the database."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Single-AZ subnet or node pool presented as highly available",
      "What the Issue Is": "The architecture is described as highly available while the configuration places subnets, node pools or instances in a single availability zone. The claim and the configuration live in different documents and are never compared. The gap only becomes visible during a zone failure.",
      "Topic / Framework(s)": "AWS Well-Architected, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The gap between the architecture claim and the configuration is only visible by reading both together."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No PodDisruptionBudget, so a node drain takes the service to zero",
      "What the Issue Is": "A workload has no PodDisruptionBudget, so a voluntary disruption such as a node drain during an upgrade can evict all its replicas at once. Routine cluster maintenance then takes the service to zero. It appears to the team as a platform fault rather than as a missing declaration.",
      "Topic / Framework(s)": "CNCF Cloud Native, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "kube-linter, Polaris",
      "Why This Matters": "Routine cluster maintenance becomes an outage that looks like a platform fault."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Single replica with no anti-affinity for a user-facing service",
      "What the Issue Is": "A user-facing deployment is configured with a single replica, or with several replicas that carry no anti-affinity rule and can be scheduled onto the same node. Losing one node is then a complete outage. Both conditions are visible in the manifest and reported by standard linters.",
      "Topic / Framework(s)": "CNCF Cloud Native",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "kube-linter, Polaris",
      "Why This Matters": "One node loss is one full outage, and manifest linters flag it directly."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Container runs privileged, or mounts hostPath or hostNetwork",
      "What the Issue Is": "A pod is granted privileged mode, or mounts a host path, the host network or the host process namespace. Each of these removes part of the isolation that containers provide. It is usually done to make one specific thing work and is then copied into other manifests.",
      "Topic / Framework(s)": "CNCF Cloud Native, CIS Benchmarks",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "kube-linter, kubesec, Trivy",
      "Why This Matters": "Container isolation is waived, and standard manifest scanners detect it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No NetworkPolicy, so every pod can reach every other pod",
      "What the Issue Is": "The cluster has no NetworkPolicy resources, so the default of allowing all pod-to-pod traffic applies. Any compromised workload can reach every other workload and every internal service. Segmentation exists in the architecture diagram and not in the cluster.",
      "Topic / Framework(s)": "Zero Trust, CNCF Cloud Native",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "kube-linter, Polaris",
      "Why This Matters": "Lateral movement after any single compromise is unrestricted by default."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Secrets mounted as environment variables from plain Kubernetes Secrets",
      "What the Issue Is": "Secrets are stored as Kubernetes Secret objects, which are base64-encoded rather than encrypted unless encryption at rest is configured, and are injected into containers as environment variables. Environment variables appear in crash dumps, process listings and child processes. An external secret manager with mounted files avoids both problems.",
      "Topic / Framework(s)": "Zero Trust, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "kubesec, External Secrets policies",
      "Why This Matters": "Base64 is not encryption, and environment variables leak into crash dumps and child processes."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Service account token automounted where it is not used",
      "What the Issue Is": "Pods are given a service account token by default even when they never call the Kubernetes API. Any compromise of the container then also yields a cluster credential. Disabling automount for workloads that do not need it is a single field.",
      "Topic / Framework(s)": "Zero Trust, CNCF Cloud Native",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "kube-linter",
      "Why This Matters": "Every compromised pod gets a cluster credential it never needed."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Autoscaling driven by CPU only for a latency-bound or IO-bound workload",
      "What the Issue Is": "Horizontal autoscaling is configured against CPU utilisation for a workload whose constraint is latency, queue depth or I/O. CPU stays low while the service is saturated, so it does not scale up when it should, and scales down while still under pressure. The metric and the actual constraint were never connected.",
      "Topic / Framework(s)": "CNCF Cloud Native, Google SRE",
      "Area / Pillar": "Performance, Cost",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The signal does not correlate with the pressure, so the service scales at the wrong time in both directions."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Memory limit absent, or requests set equal to limits on a bursty workload",
      "What the Issue Is": "A container has no memory limit, so it can consume the node's memory and cause other pods to be evicted, or requests and limits are set equal for a workload with bursty demand, so it is throttled or killed during normal peaks. The right setting depends on the workload's actual profile rather than on a default.",
      "Topic / Framework(s)": "CNCF Cloud Native, FinOps",
      "Area / Pillar": "Cost, Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "kube-linter, Goldilocks, VPA reports",
      "Why This Matters": "One workload either evicts its neighbours or reserves capacity it never uses."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Rolling update surge and unavailability settings that breach the error budget",
      "What the Issue Is": "The rolling update strategy allows a proportion of replicas to be unavailable, or surges beyond what the dependencies can absorb, without reference to the service's error budget. Each deploy therefore consumes availability. Calculating whether this is acceptable requires the SLO and the manifest together.",
      "Topic / Framework(s)": "Google SRE, CNCF Cloud Native",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every deploy quietly spends availability, and the arithmetic needs the SLO alongside the manifest."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Termination grace period not aligned with the application's shutdown handling",
      "What the Issue Is": "The pod's termination grace period is shorter than the time the application takes to finish in-flight work and shut down cleanly, so the platform sends SIGKILL while requests are still being served. The two values are set in different files by different people. Requests fail during every deploy for reasons that look like network errors.",
      "Topic / Framework(s)": "CNCF Cloud Native, Twelve-Factor App",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The platform kills the process mid-request because two numbers in two different files disagree."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Environment values duplicated per environment with silent divergence",
      "What the Issue Is": "Per-environment configuration is maintained as separate copies of values files or manifests rather than as a base plus overlays, so settings drift apart over time. Production ends up with values nobody deliberately chose, usually because a change was applied to staging only. The difference exists only across files and is never displayed in one place.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "helm lint (shallow), kustomize diff",
      "Why This Matters": "Production carries settings nobody intended, and the difference exists only across files."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Cluster autoscaler and workload scheduling constraints in conflict",
      "What the Issue Is": "Node scaling policies and workload scheduling constraints, such as taints, tolerations, affinity and topology spread, are configured independently and conflict. The autoscaler adds nodes that the pending pods cannot be scheduled onto. Cost rises while the workload stays pending.",
      "Topic / Framework(s)": "CNCF Cloud Native, FinOps",
      "Area / Pillar": "Cost",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Nodes are added that no pod can be scheduled onto, so cost rises without capacity rising."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No cost allocation tags or labels on provisioned resources",
      "What the Issue Is": "Provisioned resources carry no tags or labels identifying the owning team, environment, service or cost centre. Cloud spend cannot then be attributed to anything. Reduction efforts stall at the point of asking whose resource this is.",
      "Topic / Framework(s)": "FinOps, AWS Well-Architected",
      "Area / Pillar": "Cost",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Checkov, tflint custom rules, OPA",
      "Why This Matters": "Spend cannot be attributed, so it cannot be reduced by anyone in particular."
    }
  ],
  "Desktop Applications": [
    {
      "Code Issue / Anti-Pattern Identified": "Renderer created with node integration enabled or context isolation disabled",
      "What the Issue Is": "An Electron renderer window is created with nodeIntegration enabled or contextIsolation disabled, so JavaScript running in the page has direct access to Node APIs including the filesystem and child process spawning. Any content in that window, including a compromised dependency, gains full local capability. The secure defaults exist and are being explicitly overridden.",
      "Topic / Framework(s)": "Electron security checklist, OWASP",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "electronegativity",
      "Why This Matters": "Any script in the page gets filesystem and process access, and a dedicated scanner reports it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Remote content loaded into a window that holds application privileges",
      "What the Issue Is": "A window that has application-level privileges loads content from the internet, or navigates to it, rather than loading only local content and communicating with remote services through a controlled channel. Remote content then runs inside the privileged context. Determining whether this happens requires tracing window creation, navigation handlers and preload script exposure together.",
      "Topic / Framework(s)": "Electron security checklist, OWASP",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "electronegativity (partial)",
      "Why This Matters": "Trust boundaries need tracing across window creation, navigation handlers and preload scripts."
    },
    {
      "Code Issue / Anti-Pattern Identified": "IPC handler with no sender or channel validation",
      "What the Issue Is": "An inter-process communication handler in the main process acts on messages without checking which renderer or frame sent them and whether that sender should be allowed to invoke it. A compromised or unexpected renderer can call privileged operations directly. The handler is typically written as if only the intended caller exists.",
      "Topic / Framework(s)": "Zero Trust, OWASP",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A compromised renderer calls privileged main-process code directly."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Shell command or openExternal called with unvalidated input",
      "What the Issue Is": "A shell command, a call to open an external URL, or a native process launch is constructed from input the application did not fully control. Shell metacharacters or an unexpected URL scheme turn the call into arbitrary execution. Both the pattern and the fix are well established.",
      "Topic / Framework(s)": "CWE Top 25, OWASP",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, electronegativity",
      "Why This Matters": "Standard command injection, detectable by pattern."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Auto-update channel without signature verification or a pinned host",
      "What the Issue Is": "The application's update mechanism downloads and installs a new version without verifying a cryptographic signature over the payload, or fetches it from a host that is not pinned. Anyone able to intercept or redirect that request can install arbitrary code. An update channel is the most reliable distribution route an attacker can obtain.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The update mechanism becomes the most reliable way to install malware on every user's machine."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Application not code-signed or notarised for the target platform",
      "What the Issue Is": "The distributed binary is not signed with a recognised developer certificate, or on macOS is not notarised. The operating system warns the user and, in some configurations, refuses to run it. Users who are taught to bypass these warnings for your app will bypass them for others.",
      "Topic / Framework(s)": "NIST SSDF, platform distribution guidelines",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Platform signing verification tools",
      "Why This Matters": "Users are trained to bypass the warning, which removes the protection for everything else too."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Credentials stored in a plain config file rather than the OS keychain",
      "What the Issue Is": "Tokens, passwords or API keys are written to a JSON or plist configuration file inside the user's profile rather than stored in the platform keychain or credential manager. Any process running as that user can read the file. The platform provides an API specifically for this class of data.",
      "Topic / Framework(s)": "OWASP, Zero Trust",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Gitleaks (partial)",
      "Why This Matters": "Any other process running as the user can read them."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Local HTTP or WebSocket server bound to all interfaces",
      "What the Issue Is": "A local HTTP, WebSocket or debug server started by the application binds to all network interfaces rather than to the loopback address. It is then reachable from any other machine on the same network. The binding is usually a default that was never examined.",
      "Topic / Framework(s)": "OWASP, Zero Trust",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "A developer convenience becomes a network service on every public wifi."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Long work executed on the UI thread",
      "What the Issue Is": "File parsing, encryption, image processing, database work or a synchronous network call runs on the thread that services the user interface. The window stops redrawing and stops responding to input for the duration. The operating system detects this and offers the user the option to force quit.",
      "Topic / Framework(s)": "Static Performance, platform HIG",
      "Area / Pillar": "Performance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Platform profilers, Instruments",
      "Why This Matters": "The window stops responding and the operating system offers to kill the app."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No crash reporting or symbolication for released builds",
      "What the Issue Is": "The application collects no crash reports from released builds, or collects them without the symbol files needed to turn addresses into stack frames. Crashes on user machines therefore produce no actionable information. Stability is assessed from support tickets, which represent a small fraction of occurrences.",
      "Topic / Framework(s)": "Observability, Google SRE",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Open source crash collectors",
      "Why This Matters": "Desktop crashes are invisible unless users bother to report them, and most do not."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Deep link or custom protocol handler accepts unvalidated payloads",
      "What the Issue Is": "The application registers a custom URL scheme or deep link and acts on the parameters without validating them or considering that any web page can trigger them. A link can therefore drive the installed application into performing actions. Handlers of this kind are commonly written as if the caller were trusted.",
      "Topic / Framework(s)": "OWASP, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A web page can drive the installed application, and the handler is usually written as if input were trusted."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Bundled runtime or dependency never updated after release",
      "What the Issue Is": "The shipped application bundles a runtime, framework or set of libraries that are pinned at the version current when it was built and are not updated in subsequent releases. Unlike a server, there is no central place to patch them. Known vulnerabilities remain on user machines until they install a new version.",
      "Topic / Framework(s)": "NIST SSDF, SLSA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Trivy, Retire.js, Dependabot",
      "Why This Matters": "The shipped binary carries known vulnerabilities that server-side patching never reaches."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Local state written with no migration between application versions",
      "What the Issue Is": "The application writes settings, caches or a local database into the user profile, and a new version reads the same location with a changed format, without a migration step or a version marker. Upgrading corrupts or discards the data. It affects long-standing users most, because they have the most accumulated state.",
      "Topic / Framework(s)": "DORA, Release It!",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "An upgrade corrupts or discards user data, and the affected users are the loyal ones."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Offline behaviour undefined, network failure surfaces as a blank window",
      "What the Issue Is": "The application assumes a working network connection at startup and during use, so a failure produces an empty window, an infinite spinner or an unhandled error rather than cached content and a clear offline state. Desktop users expect an installed application to open regardless. The failure is usually interpreted as a broken installation.",
      "Topic / Framework(s)": "Release It!, platform HIG",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Desktop users expect the app to open without a network, and the failure looks like a broken install."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Window state, multi-monitor and DPI scaling assumptions hardcoded",
      "What the Issue Is": "Window sizes and positions, multi-monitor arrangements and display scaling are assumed rather than queried and persisted safely. The application opens off-screen, at an unusable size, or blurry on a high-DPI display. Configurations that differ from the developer's are never exercised.",
      "Topic / Framework(s)": "Platform HIG",
      "Area / Pillar": "Usability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The app opens off-screen or unreadably small on a configuration nobody tested."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No uninstall or data-removal path for locally cached personal data",
      "What the Issue Is": "The application caches personal data locally and provides no way to clear it, and its uninstaller leaves it behind. A deletion request cannot be honoured for data that exists only on user machines. The retention policy applied to the server has no counterpart on the client.",
      "Topic / Framework(s)": "Privacy/GDPR",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Deletion requests cannot be honoured for data that only exists on the user's disk."
    }
  ],
  "Browser Extensions": [
    {
      "Code Issue / Anti-Pattern Identified": "Host permissions declared for all URLs where a narrow match would do",
      "What the Issue Is": "The manifest requests host permissions for all URLs when the extension only needs to operate on a specific set of sites. Users see a broad permission warning at install, store review is stricter, and the extension holds access it never uses. Narrowing the match patterns is usually a small change to the manifest.",
      "Topic / Framework(s)": "Browser extension platform policy, Zero Trust",
      "Area / Pillar": "Security, Privacy",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "web-ext lint, manifest linters",
      "Why This Matters": "Review friction and user distrust for capability the extension does not use."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Content script injected into every origin including banking and health sites",
      "What the Issue Is": "A content script is injected into every page the user visits, including banking, health and internal corporate sites, because the match pattern was written broadly for convenience. The extension therefore has read access to content it has no purpose for. It is both a privacy exposure and one of the most common causes of store removal.",
      "Topic / Framework(s)": "Platform policy, Privacy/GDPR",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "web-ext lint (partial)",
      "Why This Matters": "The extension observes pages it has no purpose on, which is both a privacy exposure and a store rejection risk."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Remote code fetched and evaluated at runtime",
      "What the Issue Is": "The extension downloads code at runtime and evaluates it, or loads a remote script into an extension page. Manifest V3 and the store policies prohibit this because the reviewed code is then not the code that runs. It also means a compromise of the hosting server becomes a compromise of every installation.",
      "Topic / Framework(s)": "Platform policy (MV3), SLSA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "web-ext lint, store review tooling",
      "Why This Matters": "Explicitly prohibited, and the shipped review no longer describes what runs."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Message passing without validating the sender extension or tab origin",
      "What the Issue Is": "A message listener in the background service worker acts on incoming messages without verifying the sender's extension identifier, tab or origin. Web pages and other extensions can send messages to a listener that was written expecting only the extension's own content scripts. Privileged operations become callable from outside.",
      "Topic / Framework(s)": "Zero Trust, OWASP",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Any page or extension can invoke privileged background handlers."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Page DOM trusted as input to a privileged background handler",
      "What the Issue Is": "A content script reads values from the page and passes them to a background handler that treats them as trusted, for example as a URL to fetch or an identifier to act on. The content script sits exactly on the boundary between untrusted page content and privileged extension code. Recognising the boundary requires reading both sides together.",
      "Topic / Framework(s)": "OWASP, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The content script sits on the trust boundary, and the boundary is only visible by reading both sides."
    },
    {
      "Code Issue / Anti-Pattern Identified": "innerHTML used with page-derived content in extension UI",
      "What the Issue Is": "Content taken from the page is inserted into the extension's own UI using innerHTML or an equivalent. Script in that content then executes inside a context that holds the extension's permissions, which is considerably more damaging than the same defect on an ordinary web page. Standard linters detect the assignment.",
      "Topic / Framework(s)": "OWASP, CWE Top 25",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "ESLint, Semgrep",
      "Why This Matters": "Cross-site scripting inside a context that holds extension permissions."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Tokens or user data stored unencrypted in extension storage",
      "What the Issue Is": "Access tokens, credentials or personal data are written to chrome.storage.local or localStorage in plain form. Extension storage is a file in the browser profile and is readable by anything with local access to the machine or the profile directory. Synchronised storage additionally distributes it across devices.",
      "Topic / Framework(s)": "OWASP, Privacy/GDPR",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Extension storage is readable by anything with local access to the profile."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Data sent to an analytics endpoint not disclosed in the privacy policy",
      "What the Issue Is": "The extension sends browsing data, page content or usage information to an analytics or backend endpoint that its privacy policy and store listing do not describe. Detecting it requires following the data from where it is collected to where it leaves. Undisclosed data collection is the fastest route to removal from a store.",
      "Topic / Framework(s)": "Privacy/GDPR, platform policy",
      "Area / Pillar": "Compliance",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Finding it requires following the data from collection to egress, and it is the fastest route to a store takedown."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Service worker assumed persistent, state lost on termination",
      "What the Issue Is": "Under Manifest V3 the background context is a service worker that the browser terminates when idle, but the code keeps state in module-level variables as though it persisted. State is lost between invocations. It works throughout development, where the worker is kept alive, and fails for users after a short idle period.",
      "Topic / Framework(s)": "Platform policy (MV3)",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The extension works during development and loses state for real users after idle timeout."
    },
    {
      "Code Issue / Anti-Pattern Identified": "All permissions requested at install rather than optionally at point of use",
      "What the Issue Is": "Every permission the extension might ever need is declared in the manifest and requested at install time, rather than declared as optional and requested when the relevant feature is first used. The install-time permission warning is a major factor in whether users complete installation. The extension also holds capability before there is any reason to.",
      "Topic / Framework(s)": "Platform policy, Privacy by Design",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Install conversion drops and the extension holds capability before it needs it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Injected CSS or DOM modification with no scoping",
      "What the Issue Is": "Styles or DOM changes injected into the host page are written without scoping, using broad selectors or global rules. They then affect elements the extension did not intend to touch and break the site's own layout. The site's owner receives the bug report and cannot reproduce it.",
      "Topic / Framework(s)": "Web platform practice",
      "Area / Pillar": "Usability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The extension breaks host page layout, and the host site gets the bug report."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No kill switch or update path when a host site changes its DOM",
      "What the Issue Is": "The extension depends on the structure of a third-party site's DOM, and has no server-controlled way to disable a feature or adjust its selectors when that site changes. Since the site can change at any time without notice, the extension breaks on someone else's schedule. Every fix requires a new store submission and review.",
      "Topic / Framework(s)": "Release It!, DORA",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The extension breaks on a schedule set by someone else, with no way to degrade gracefully."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Extension update URL or ID not pinned",
      "What the Issue Is": "The extension's identifier or update URL is not pinned, so a sideloaded or repackaged build can present itself as the same extension. Users cannot distinguish the published build from a modified one. It also complicates any attempt to verify what is actually installed.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Sideloaded or spoofed builds can impersonate the published extension."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Bundled third-party script with no integrity check or version pin",
      "What the Issue Is": "A third-party library is bundled into the extension without a pinned version or an integrity check. Whatever that library does, it does with the extension's permissions, which typically include access to page content across many sites. A compromise upstream propagates to every user on the next release.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Retire.js, Dependabot, npm audit",
      "Why This Matters": "A compromised dependency ships with extension privileges to every installed user."
    }
  ],
  "Libraries & SDKs": [
    {
      "Code Issue / Anti-Pattern Identified": "Breaking change shipped without a major version bump",
      "What the Issue Is": "A change that removes, renames or alters the behaviour of a public API is released as a minor or patch version. Consumers using a caret or tilde range receive it automatically and their builds break without any change on their side. Semantic versioning is the only signal consumers have about whether an upgrade is safe.",
      "Topic / Framework(s)": "Semantic Versioning, SLSA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "api-extractor, japicmp, cargo-semver-checks",
      "Why This Matters": "Consumers on a caret range break on a routine update, and the trust cost outlasts the fix."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Public API surface larger than intended, internals exported",
      "What the Issue Is": "Types, functions and modules that were intended as internal are exported from the package entry point, usually because exporting everything was simpler. Consumers begin depending on them. They then become part of the contract regardless of any comment saying they are private.",
      "Topic / Framework(s)": "Clean Architecture, Semantic Versioning",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "api-extractor, public API snapshot tests",
      "Why This Matters": "Anything reachable becomes a contract the moment someone depends on it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Transitive dependency type leaking into the public signature",
      "What the Issue Is": "A function signature or exported type references a type that comes from a dependency, so that dependency's shape becomes part of your public contract. Upgrading it is then a breaking change for your consumers even though your own code has not changed. Consumers may also need to install the dependency themselves to use your API.",
      "Topic / Framework(s)": "Semantic Versioning, SLSA",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "api-extractor, arethetypeswrong",
      "Why This Matters": "The library's public contract now changes whenever an unrelated dependency does."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Deprecation added with no removal timeline and no migration guide",
      "What the Issue Is": "An API is marked deprecated with no stated version in which it will be removed and no documentation of what to use instead. Consumers have no deadline and no migration path, so nothing moves. The deprecated surface is maintained indefinitely alongside its replacement.",
      "Topic / Framework(s)": "Semantic Versioning, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Nothing ever gets removed, so the library carries every past mistake forward."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Peer dependency declared as a direct dependency",
      "What the Issue Is": "A library that must share a single instance with the host application, such as a framework, a React runtime or a logging facade, is declared as a direct dependency rather than a peer dependency. The package manager can then install a second copy. Two copies of a singleton produce failures that appear to come from the framework rather than from the packaging.",
      "Topic / Framework(s)": "Semantic Versioning, packaging practice",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "npm ls, depcheck",
      "Why This Matters": "Two copies of a singleton-style dependency load, and the resulting bugs look like framework faults."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Version range too loose for a dependency that ships behavioural changes",
      "What the Issue Is": "A dependency that regularly changes behaviour within its minor range is declared with a wide version range. A consumer's build then resolves a version you have never tested against. When it breaks, neither you nor the consumer made a change.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Renovate, Dependabot, npm audit",
      "Why This Matters": "A consumer's build breaks from a change neither party made."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Global or singleton state inside a library",
      "What the Issue Is": "The library keeps state in a module-level variable, a static field or a singleton, so two consumers within the same process share it. Configuration set by one affects the other, and concurrent use interferes. The failure appears only in the host application, where both consumers exist.",
      "Topic / Framework(s)": "Clean Architecture",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Two consumers in one process collide, and the failure only appears in the host application."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Library reads environment variables or files directly instead of accepting configuration",
      "What the Issue Is": "The library reads environment variables, configuration files or global settings directly instead of accepting configuration through its API. The consumer cannot control it, cannot test it with different settings, and cannot see the dependency in any signature. It also behaves differently in environments the consumer did not intend.",
      "Topic / Framework(s)": "Twelve-Factor App",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The consumer cannot control or test the library's behaviour, and the coupling is invisible in the signature."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Library writes to stdout or installs a global handler on the consumer's behalf",
      "What the Issue Is": "The library writes to stdout or stderr, configures a global logger, installs an uncaught exception handler or sets process-level options. These are decisions that belong to the application, not to a component of it. Consumers discover them in production output.",
      "Topic / Framework(s)": "Twelve-Factor App, Observability",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The library takes a decision that belongs to the application, and it is discovered in production logs."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Errors thrown as plain strings or untyped values",
      "What the Issue Is": "Errors are raised as plain strings, generic error objects, or types that carry no discriminator, so consumers cannot distinguish a transient failure from a permanent one or a validation error from an outage. The rational response is to catch everything and treat it identically. Meaningful error handling becomes impossible for the consumer to write.",
      "Topic / Framework(s)": "CWE Top 25, API design practice",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "ESLint, SonarQube",
      "Why This Matters": "Consumers cannot distinguish recoverable from fatal, so they catch everything or nothing."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No timeout, retry or cancellation control exposed on network calls",
      "What the Issue Is": "The library performs network calls with timeouts, retry behaviour and cancellation fixed internally and not exposed through its API. The consumer inherits whatever resilience posture the library chose and cannot adapt it to their own latency budget. In an outage the consumer has no lever to pull.",
      "Topic / Framework(s)": "Release It!, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The consumer inherits the library's resilience posture with no way to change it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Telemetry collected by default without opt-in",
      "What the Issue Is": "The library sends usage or diagnostic telemetry by default, requiring the consumer to discover and disable it. The consumer becomes responsible under privacy law for a data flow they did not know existed. Discovery usually happens through network monitoring rather than documentation.",
      "Topic / Framework(s)": "Privacy/GDPR",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The consumer becomes a data controller for a collection they did not know about."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Package published with tests, source maps or credentials in the tarball",
      "What the Issue Is": "The published package contains files that were never meant to ship, such as tests, fixtures, source maps, build configuration or environment files. Package size increases and internal detail is distributed to every consumer. Where the extra files include configuration, credentials can be published along with them.",
      "Topic / Framework(s)": "NIST SSDF, SLSA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "publint, npm pack --dry-run",
      "Why This Matters": "Internal detail and occasionally secrets ship to every consumer."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No provenance attestation or signature on the published package",
      "What the Issue Is": "The published artifact has no signature and no provenance attestation linking it to the source repository and the build that produced it. Consumers cannot verify that the package corresponds to the code they can read. Registry account compromise is a well-established attack path.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Cosign, registry provenance tooling",
      "Why This Matters": "Consumers cannot verify that the artifact came from the repository it claims."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Module entry points inconsistent across ESM, CJS or type definitions",
      "What the Issue Is": "The package declares entry points for CommonJS, ES modules and type definitions that disagree with each other or with the files actually shipped. It then resolves correctly in one consumer toolchain and fails in another, often with an error that points nowhere useful. The tooling to validate this is fast and automated.",
      "Topic / Framework(s)": "Packaging practice",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "publint, arethetypeswrong",
      "Why This Matters": "The package works for one consumer toolchain and fails for another."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Example code in documentation no longer compiles against the current API",
      "What the Issue Is": "Code samples in the README or the documentation site were written against an earlier version of the API and no longer compile or run. They are the first thing a new consumer tries. Because nothing builds them, they degrade silently with every release.",
      "Topic / Framework(s)": "DORA",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Doctest and example-compilation runners",
      "Why This Matters": "The first thing a new consumer tries is the thing that is broken."
    }
  ],
  "Integrations & Payments": [
    {
      "Code Issue / Anti-Pattern Identified": "Over-the-air update applied without signature verification",
      "What the Issue Is": "The device accepts and installs a firmware image without verifying a cryptographic signature over it, or verifies it in the application rather than in the bootloader. Anyone able to reach the update path can install arbitrary firmware. Establishing whether the check is sound requires reading the bootloader and the application together.",
      "Topic / Framework(s)": "NIST SSDF, IEC 62443",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The update path is the highest-value target on a device, and the check spans bootloader and application code."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No A/B partition or rollback path after a failed update",
      "What the Issue Is": "The device writes a new firmware image over the running one, with no second partition and no way to revert to the previous image if the new one fails to boot or fails to connect. A defective update then bricks every device that received it. Recovery requires physical access to each unit.",
      "Topic / Framework(s)": "IEC 62443, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A bad image bricks the fleet, and recovery means physical access to every unit."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Watchdog disabled or fed unconditionally during a long operation",
      "What the Issue Is": "The hardware watchdog is disabled during a long operation, or is fed unconditionally from a timer rather than from evidence that the main loop is making progress. The protection against a hung device is removed exactly where a hang is most likely. The code still contains the watchdog calls, so it reads as protected.",
      "Topic / Framework(s)": "MISRA, IEC 62443",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The safety net is removed exactly where it was needed, and the code reads as if it is still armed."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Fixed-size buffer filled from network or sensor input",
      "What the Issue Is": "Data from a network socket, a serial port or a sensor is copied into a fixed-size buffer without checking the length against the buffer's capacity. The write continues past the end of the buffer into adjacent memory. In C and C++ this is the classic memory corruption defect and the most reliably detected by static analysers.",
      "Topic / Framework(s)": "CWE Top 25, MISRA",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "cppcheck, clang-tidy, static analysers",
      "Why This Matters": "Classic overflow, and C and C++ analysers detect it well."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Dynamic allocation on a hard real-time or long-running path",
      "What the Issue Is": "Memory is allocated and freed dynamically on a path that runs continuously or must meet a hard deadline. On a device with limited memory and no compaction, the heap fragments over time until an allocation of the required size fails. The failure occurs after days or weeks of uptime and does not reproduce on the bench.",
      "Topic / Framework(s)": "MISRA, AUTOSAR",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "cppcheck, MISRA checkers",
      "Why This Matters": "Fragmentation causes a failure after weeks of uptime that never reproduces on the bench."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Blocking call inside an interrupt service routine",
      "What the Issue Is": "An interrupt service routine performs work that can block, such as waiting on a mutex, writing to a peripheral with a busy wait, calling a logging function or allocating memory. Interrupts are disabled or delayed for the duration. The system misses timing deadlines that the design depends on, and the offending call is often several layers deep in a helper.",
      "Topic / Framework(s)": "MISRA, real-time practice",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The system misses deadlines it was designed around, and the cause is a call several layers deep."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Shared variable accessed from an ISR and the main loop without volatile or a lock",
      "What the Issue Is": "A variable written by an interrupt handler and read by the main loop, or the reverse, is declared without volatile and accessed without disabling interrupts or taking a lock. The compiler may cache the value in a register or reorder the access. The code is correct as written and incorrect as compiled.",
      "Topic / Framework(s)": "CWE Top 25, MISRA",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "cppcheck, clang-tidy",
      "Why This Matters": "The compiler optimises away a read that the hardware relies on."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Debug UART, JTAG or test hooks left enabled in production firmware",
      "What the Issue Is": "Debug serial output, a JTAG or SWD port, or a diagnostic command interface remains enabled in production firmware, usually because it is controlled by a build flag that was not changed for the release configuration. Physical access to the device then yields full control. Hardware analysis routinely begins by looking for exactly this.",
      "Topic / Framework(s)": "IEC 62443, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Build configuration review",
      "Why This Matters": "Physical access yields full control, and the hook is usually left in by a build flag nobody rechecks."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Device credentials identical across the fleet",
      "What the Issue Is": "Every device in the fleet ships with the same key, certificate or password, typically because per-device provisioning was deferred. Extracting the secret from one device, which is a routine hardware exercise, compromises all of them. There is no way to revoke it without a firmware update to the entire fleet.",
      "Topic / Framework(s)": "Zero Trust, IEC 62443",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Extracting one device's key compromises every device ever shipped."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Keys stored in flash rather than a secure element",
      "What the Issue Is": "Private keys and certificates are stored in ordinary flash rather than in a secure element or a hardware-protected key store. Reading flash from a physical device is standard practice in security assessment. The key is present in the dump along with everything else.",
      "Topic / Framework(s)": "IEC 62443, NIST SSDF",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Firmware dumps are routine in hardware analysis, and the key is in the dump."
    },
    {
      "Code Issue / Anti-Pattern Identified": "TLS certificate validation disabled to make the device connect",
      "What the Issue Is": "Certificate verification is disabled, or a verification callback is written to always return success, usually to get a device connecting during development or to work around an expired certificate in the field. All transport security is then decorative. The change is a single line and is rarely revisited.",
      "Topic / Framework(s)": "OWASP, IEC 62443",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, cppcheck, custom rules",
      "Why This Matters": "A field workaround becomes a permanent man-in-the-middle opening, and pattern scanners catch it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Reconnect loop without backoff, so the fleet stampedes the broker",
      "What the Issue Is": "When the connection to the backend or the message broker drops, the device reconnects immediately or at a fixed interval with no exponential backoff and no random jitter. Every device in the fleet was disconnected by the same event, so they all retry in step. The backend is overwhelmed at the moment it becomes available again.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Recovery from a brief outage becomes a self-inflicted denial of service at fleet scale."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Frequent small writes causing flash write amplification",
      "What the Issue Is": "The firmware writes to flash frequently in small increments, for example logging or persisting a counter on every cycle. Flash has a finite erase and write endurance per sector, and each small write can trigger a full sector erase. Devices fail from wear within their expected service life, traceable to a logging decision made years earlier.",
      "Topic / Framework(s)": "Embedded practice",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The part wears out inside the warranty period, and the cause is a logging decision made years earlier."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Time assumed monotonic across a counter wrap or an RTC resync",
      "What the Issue Is": "Elapsed time is computed by subtracting timestamps from a counter that wraps, or from a real-time clock that can be resynchronised, without handling the discontinuity. The computed interval becomes negative or enormous at the wrap point. Because wraps may be days or weeks apart, the defect can take years to be identified.",
      "Topic / Framework(s)": "CWE Top 25, MISRA",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The device misbehaves once per wrap interval, which is why these bugs take years to find."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No telemetry or crash log retrievable from a field device",
      "What the Issue Is": "A device in the field that crashes, resets or misbehaves produces no log or crash record that can be retrieved remotely. The only diagnostic route is to have the hardware returned. Failure patterns across the fleet cannot be observed at all.",
      "Topic / Framework(s)": "Observability",
      "Area / Pillar": "Observability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Field failures can only be diagnosed by returning hardware."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Power loss during a write leaves persistent state inconsistent",
      "What the Issue Is": "Persistent state such as a configuration record, a counter or a filesystem entry is written in a way that is not atomic with respect to power loss, so an interruption mid-write leaves it partially updated. For a battery or mains-powered device, power loss during a write is an ordinary event. Recovery requires either a journal, a checksum or a two-copy scheme.",
      "Topic / Framework(s)": "IEC 62443, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Power loss is the normal case for a device rather than the exceptional one."
    }
  ],
  "Legacy Modernization": [
    {
      "Code Issue / Anti-Pattern Identified": "Webhook signature or timestamp not verified",
      "What the Issue Is": "The webhook endpoint processes incoming events without verifying the provider's signature over the payload, and without checking the timestamp to reject replays. Anyone who discovers or guesses the URL can post events that the system treats as authoritative statements from the provider. For payment and order events this directly alters business state.",
      "Topic / Framework(s)": "OWASP, PCI DSS",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Semgrep (partial)",
      "Why This Matters": "Anyone who learns the URL can post events the system treats as authoritative."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Webhook handler not idempotent under provider retries",
      "What the Issue Is": "The webhook handler performs its work every time it is called, with no record of which event identifiers have already been processed. Providers retry deliveries whenever they do not receive a timely success response, which is normal operation rather than an error condition. The same event therefore gets applied more than once.",
      "Topic / Framework(s)": "AWS Well-Architected, Release It!",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Providers retry by design, so duplicate processing is guaranteed rather than possible."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Webhook processed synchronously on a slow path",
      "What the Issue Is": "The webhook handler performs the full downstream work before returning a response, so acknowledgement is delayed by however long that work takes. The provider times out and retries, adding load, which makes the handler slower still. Accepting the event, persisting it and processing asynchronously breaks the cycle.",
      "Topic / Framework(s)": "Release It!, Google SRE",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Slow acknowledgement triggers more retries, and the retries make it slower."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Charge, transfer or order created without an idempotency key",
      "What the Issue Is": "A request that creates a charge, a transfer or an order is sent without an idempotency key, so the provider cannot recognise a repeat of the same logical operation. When a response is lost to a timeout and the client retries, the provider creates a second one. The customer is charged twice and the system has no record that it happened.",
      "Topic / Framework(s)": "PCI DSS, AWS Well-Architected",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "A timeout the client retries becomes a second real charge with a real customer on the other end."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Money represented as a floating point number",
      "What the Issue Is": "Monetary amounts are held in a float or double. Values such as 0.1 have no exact binary representation, so sums drift and comparisons behave unpredictably. The discrepancies do not raise errors; they appear later as differences between your ledger and the provider's.",
      "Topic / Framework(s)": "CWE Top 25, Static Performance",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Semgrep, SonarQube, PMD",
      "Why This Matters": "Rounding errors accumulate into reconciliation breaks, and type-based rules catch this cheaply."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Currency implied by context rather than carried with the amount",
      "What the Issue Is": "Amounts are stored and passed without an accompanying currency code, on the assumption that everything is in one currency. The assumption is embedded across the schema and the code rather than stated in one place. The first requirement to support a second currency makes every historical amount ambiguous.",
      "Topic / Framework(s)": "DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The first multi-currency requirement turns every stored amount into a guess."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No reconciliation between the internal ledger and provider records",
      "What the Issue Is": "There is no scheduled process comparing the system's own record of transactions against the provider's, so a divergence caused by a missed webhook, a timeout or a duplicate is never detected. Money-moving systems diverge in practice regardless of how carefully they are written. Without reconciliation, customers and auditors find the discrepancies first.",
      "Topic / Framework(s)": "PCI DSS, Google SRE",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Discrepancies are found by customers or auditors instead of by the system."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Payment or order state machine permits an illegal transition",
      "What the Issue Is": "The code that advances an order or payment through its states allows transitions that should be impossible, such as refunding an uncaptured authorisation, capturing twice, or completing an order that was cancelled. Each individual transition looks reasonable where it is written. The defect is only visible when the whole state graph is considered.",
      "Topic / Framework(s)": "Release It!, DDD",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Refunding an uncaptured payment or capturing twice needs reading the whole state graph to spot."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Provider outage has no queued or degraded path",
      "What the Issue Is": "When the provider is unavailable, requests fail and the user-facing operation fails with them, because there is no queue, no deferred processing and no alternative path. Payment and messaging providers have incidents like any other dependency. The business stops for the duration of someone else's outage.",
      "Topic / Framework(s)": "Release It!, Netflix Chaos",
      "Area / Pillar": "Resilience",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Revenue stops entirely for the duration of someone else's incident."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Card, bank or credential data reaching application logs or storage",
      "What the Issue Is": "Full card numbers, bank details, tokens or authentication credentials are written into application logs, error reports or a local database. Doing so brings every system that stores or forwards those logs into the compliance scope for that data. Log pipelines rarely have the controls that the primary systems do.",
      "Topic / Framework(s)": "PCI DSS, Privacy/GDPR",
      "Area / Pillar": "Compliance",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Presidio, Gitleaks, log scrubbing rules",
      "Why This Matters": "Compliance scope expands to every system the log touches."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Provider SDK called from controllers or domain code with no adapter",
      "What the Issue Is": "The provider's SDK is called directly from controllers, domain objects or view logic, rather than behind an interface the application owns. Provider-specific types and error handling spread through the codebase. Adding a second provider or switching becomes a rewrite instead of an additional implementation.",
      "Topic / Framework(s)": "Clean Architecture",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Switching or adding a provider becomes a rewrite rather than a new implementation."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Sandbox and production credentials selected by a code branch",
      "What the Issue Is": "Which provider environment is used is decided by an if statement on an environment name or a debug flag, rather than by configuration supplied per deployment. The branch reads as harmless. It is the usual mechanism by which a test transaction is executed against production, or a production transaction against a sandbox.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Semgrep",
      "Why This Matters": "A test transaction runs against production, or the reverse, and the branch reads as harmless."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Provider API version unpinned",
      "What the Issue Is": "The integration calls the provider without specifying an API version, so it follows whatever version the provider makes current. The provider then changes response shapes or behaviour on their release schedule, with no deploy on your side. The break arrives without any change in your repository to point at.",
      "Topic / Framework(s)": "SLSA, Release It!",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The integration changes behaviour on the provider's release schedule with no deploy on your side."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No contract test or recorded fixture for the provider's responses",
      "What the Issue Is": "There is no contract test against the provider and no recorded set of real responses used as fixtures, so tests exercise only the success case with handwritten data. Error responses, rate limit responses, unusual states and edge cases are never executed. They are first encountered in production with a customer waiting.",
      "Topic / Framework(s)": "Contract Testing, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "Pact, Specmatic, HTTP record-replay libraries",
      "Why This Matters": "Error and edge-case responses are never exercised until a customer hits them."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Refund, chargeback and partial-capture paths unimplemented or untested",
      "What the Issue Is": "Refunds, partial refunds, partial captures, chargebacks and disputes are either unimplemented or implemented without tests, because the happy path was the priority. These are the flows that move money in the direction that is hardest to reverse. They are also the flows most likely to be exercised during an incident.",
      "Topic / Framework(s)": "PCI DSS, DORA",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The unhappy paths carry the money risk and get the least attention."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Provider rate-limit and quota responses not distinguished from failures",
      "What the Issue Is": "The client treats a 429 or a quota response from the provider the same as a server error and retries it, sometimes immediately. The retry consumes more of the quota and extends the throttling period. Correct handling requires reading the provider's retry-after signal and backing off.",
      "Topic / Framework(s)": "Google SRE, Release It!",
      "Area / Pillar": "Reliability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Treating a 429 as an error triggers a retry that deepens the throttle."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Customer personal data forwarded to a provider beyond what the integration needs",
      "What the Issue Is": "The integration sends the provider more customer data than the operation requires, typically because an existing object was passed wholesale rather than a purpose-built payload. The data-sharing footprint grows without any deliberate decision. Privacy assessments and processor agreements are written against what was intended, not what is sent.",
      "Topic / Framework(s)": "Privacy/GDPR",
      "Area / Pillar": "Privacy",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The data-sharing footprint grows silently through convenience payload copying."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Provider callback URL not protected against tampering or replay",
      "What the Issue Is": "The return or callback URL from the provider carries state such as an order identifier or a status, and the application acts on it without verifying a signature or checking that it has not been used before. A user can modify the parameters or replay an earlier successful redirect. Order status can be forged without touching the provider at all.",
      "Topic / Framework(s)": "OWASP, Zero Trust",
      "Area / Pillar": "Security",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Order or payment status can be forged by replaying a captured redirect."
    }
  ],
  "Embedded & IoT Firmware": [
    {
      "Code Issue / Anti-Pattern Identified": "Two forks of the same module both live, with divergent fixes",
      "What the Issue Is": "Two copies of the same module exist, usually because one was branched to make a change without disturbing the original, and both are now in use by different callers. Fixes are applied to whichever copy the developer happened to open. Determining which callers use which copy requires tracing imports across the codebase.",
      "Topic / Framework(s)": "DORA, Clean Architecture",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "jscpd, PMD CPD (partial)",
      "Why This Matters": "A fix applied to one fork silently leaves the other broken, and nobody knows which callers use which."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Dead code kept alive only by a test",
      "What the Issue Is": "A function or module has no remaining production callers, but tests still exercise it, so coverage reports show it as live code. Every cleanup pass concludes that it is used. Identifying it requires distinguishing test callers from production callers, which coverage alone does not do.",
      "Topic / Framework(s)": "DORA",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Coverage plus call-graph analysis",
      "Why This Matters": "Coverage tools say it is exercised, so it survives every cleanup pass."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Feature flag past its cutover with both branches still maintained",
      "What the Issue Is": "A flag whose rollout completed long ago is still in the code, so both the old and the new implementation remain and both must be kept working. Every subsequent change has to consider two paths. In practice only one is exercised in production, and the other silently stops working.",
      "Topic / Framework(s)": "Config Mgmt, DORA",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Every change now needs doing twice, and one of the two paths is never tested in production."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Strangler facade in place but traffic never shifted",
      "What the Issue Is": "A facade or routing layer was introduced in front of the legacy system so that traffic could be moved incrementally to a new implementation, and the traffic was never moved. The cost of the indirection has been paid and the benefit has not been realised. The migration is nominally in progress and actually stalled.",
      "Topic / Framework(s)": "Strangler Fig, DORA",
      "Area / Pillar": "Delivery",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The migration cost has been paid and none of the benefit collected."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Old and new implementations diverge with no parity test or shadow run",
      "What the Issue Is": "The old and new implementations of the same behaviour run side by side, or the new one is being prepared for cutover, with no test comparing their outputs on the same inputs and no shadow traffic. Differences accumulate unnoticed. They are discovered by customers after the switch rather than by the team before it.",
      "Topic / Framework(s)": "Strangler Fig, DORA",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Behavioural differences are discovered by customers after cutover rather than before it."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Dual-write to old and new stores with no reconciliation",
      "What the Issue Is": "During a migration the application writes to both the old and the new data store, with no process checking that the two agree and no way to repair them when they do not. Any partial failure leaves them inconsistent from that point onward. Once they have diverged, neither can be trusted as the source of truth.",
      "Topic / Framework(s)": "Release It!, DAMA DMBOK",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The two stores drift from the first partial failure onward, and neither is trustworthy afterwards."
    },
    {
      "Code Issue / Anti-Pattern Identified": "One-way data migration with no verification or cutback plan",
      "What the Issue Is": "Data is moved to a new store or schema in a one-way operation, with no verification that the migrated data matches the source and no rehearsed path back. The decision to proceed is made without evidence about correctness. If something is wrong it is discovered after the old system has been decommissioned.",
      "Topic / Framework(s)": "DORA, Release It!",
      "Area / Pillar": "Stability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The decision to proceed is made without evidence and cannot be reversed."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Business rule encoded in a stored procedure and again in application code",
      "What the Issue Is": "The same business rule exists in a database stored procedure or trigger and again in the application code, often because logic was moved out of the database incompletely. The two are maintained separately and drift. Finding the second copy requires searching a system that is not in the application repository.",
      "Topic / Framework(s)": "Clean Architecture, DDD",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The two definitions drift, and finding the second one requires searching outside the application repository."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Framework upgraded by suppressing deprecation warnings",
      "What the Issue Is": "A framework or library upgrade is completed by suppressing or silencing the deprecation warnings it produces rather than by making the changes they describe. The warnings existed to indicate what the next major version will remove. The work is deferred to a point where it must be done all at once and under pressure.",
      "Topic / Framework(s)": "NIST SSDF, DORA",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Compiler and linter warning reports",
      "Why This Matters": "The next major version removes the API entirely, and the warnings that predicted it were silenced."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Runtime or library past end of support with no recorded upgrade path",
      "What the Issue Is": "A language runtime, framework or library is past its end-of-support date, so it no longer receives security fixes, and there is no recorded plan or estimate for upgrading. The gap between the running version and the current one widens each month. The upgrade becomes progressively more expensive and more risky.",
      "Topic / Framework(s)": "NIST SSDF, SLSA",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "❌ Not required",
      "Non-AI Open Source Tool(s)": "Trivy, Dependabot, end-of-life datasets",
      "Why This Matters": "Security patches stop arriving, and the upgrade gets harder every month it is deferred."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Vendored third-party source modified in place",
      "What the Issue Is": "A third-party library was copied into the repository and then edited in place to fix a bug or add behaviour, with no record of what was changed. Upgrading to a newer upstream version would discard those changes, and nobody can enumerate them. The dependency is effectively frozen at the version it was copied at.",
      "Topic / Framework(s)": "SLSA, NIST SSDF",
      "Area / Pillar": "Supply Chain",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "Upgrades become impossible because the local changes are undocumented and interleaved."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Shared database between the old monolith and a new service",
      "What the Issue Is": "A new service reads from and writes to the same database as the system it was extracted from. It can be deployed independently but cannot evolve independently, because any schema change affects both. The coupling is invisible in the service's own code and only appears in the connection configuration.",
      "Topic / Framework(s)": "Data Mesh, Clean Architecture",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The service is independently deployable in name only, since the schema still couples them."
    },
    {
      "Code Issue / Anti-Pattern Identified": "New service reimplements the old contract with silent behaviour differences",
      "What the Issue Is": "A replacement service is written from the old system's documentation or from reading its code, and reproduces the interface without reproducing all of its behaviour, particularly around defaults, rounding, ordering, error responses and edge cases. Callers migrate assuming equivalence. The differences surface later as data inconsistencies rather than as errors.",
      "Topic / Framework(s)": "Contract Testing, DORA",
      "Area / Pillar": "Correctness",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Pact, Specmatic",
      "Why This Matters": "Callers migrate on the assumption of equivalence, and the differences surface as data problems."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Configuration duplicated across old and new deployments with drift",
      "What the Issue Is": "During a migration both the old and the new deployment carry their own copies of the same configuration, and changes are applied to one and not the other. The two systems then behave differently for reasons that are not in either codebase. Reconciling them requires comparing two deployment configurations that are rarely viewed together.",
      "Topic / Framework(s)": "Twelve-Factor App, Config Mgmt",
      "Area / Pillar": "Config",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "None",
      "Why This Matters": "The two systems behave differently for reasons that are not in either codebase."
    },
    {
      "Code Issue / Anti-Pattern Identified": "No characterisation tests written before refactoring untested code",
      "What the Issue Is": "Code with no test coverage is refactored without first writing tests that pin its current behaviour, including the behaviour that is arguably wrong. There is then no definition of correct against which to judge the result. Preserved bugs and newly introduced bugs are indistinguishable afterwards.",
      "Topic / Framework(s)": "Working Effectively with Legacy Code",
      "Area / Pillar": "Testing",
      "Coding Agent Recommended": "✅ Yes",
      "Non-AI Open Source Tool(s)": "Coverage tools (partial)",
      "Why This Matters": "The refactor has no definition of correct, so preserved bugs and introduced bugs look the same."
    },
    {
      "Code Issue / Anti-Pattern Identified": "Module boundaries absent, so any change requires reading the whole codebase",
      "What the Issue Is": "The codebase has no enforced separation between areas of responsibility, so any change requires understanding a large part of it and can affect anything. Change cost becomes roughly constant regardless of how small the change is. New contributors take months to become productive because there is no smaller unit to learn.",
      "Topic / Framework(s)": "Clean Architecture, DDD",
      "Area / Pillar": "Maintainability",
      "Coding Agent Recommended": "⚠️ Partial",
      "Non-AI Open Source Tool(s)": "dependency-cruiser, ArchUnit, jdeps",
      "Why This Matters": "Change cost is uniform and high regardless of how small the change is."
    }
  ]
};
