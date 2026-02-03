---
layout: page
title: .NET Core Master Monitoring Tool
description: Comprehensive diagnostic and monitoring shell script suite for .NET Core applications on Linux Azure App Services
img: assets/img/9.jpg
importance: 2
category: work
github: https://github.com/mainulhossain123/master_monitoring
---

## Overview

A production-ready master/modular shell script designed for comprehensive diagnostic monitoring of .NET Core applications running on Linux Azure App Services. This tool orchestrates multiple specialized monitoring scripts to track thread counts, HTTP response times, and outbound connection patterns, automatically collecting memory dumps and profiler traces when predefined thresholds are exceeded.

## Key Features

### Multi-Diagnostic Monitoring

- **Thread Count Monitoring**: Tracks ThreadPool thread counts using `dotnet-counters` and triggers diagnostics when exceeding configurable thresholds
- **Response Time Monitoring**: Monitors HTTP endpoint response times with configurable URL targets and latency thresholds
- **Outbound Connection Monitoring**: Tracks SNAT connections and identifies connection exhaustion scenarios

### Automated Diagnostic Collection

- **Memory Dumps**: Automatically captures process memory dumps using `dotnet-dump` when thresholds are breached
- **Profiler Traces**: Collects 60-second profiler traces via `dotnet-trace` for performance analysis
- **Azure Blob Upload**: Automatically uploads diagnostic artifacts to Azure Blob Storage with retry logic

### Production-Ready Features

- **Circuit Breaker Pattern**: Lock files prevent duplicate diagnostic collection per instance
- **Retry Logic**: Built-in retry mechanism (5 attempts) for Azure Blob uploads with exponential backoff
- **Multi-Instance Support**: Instance-aware logging and artifact naming for multi-instance deployments
- **Log Rotation**: Hourly log file rotation with timestamped outputs
- **Graceful Shutdown**: Clean process termination and resource cleanup

## Architecture

The tool consists of four main components:

1. **Master Script** (`master_monitoring.sh`): Orchestrator that downloads and executes specialized monitoring scripts based on user selection
2. **Thread Count Monitor** (`netcore_threadcount_monitoring.sh`): Monitors ThreadPool threads using dotnet-counters
3. **Response Time Monitor** (`resp_monitoring.sh`): Tracks HTTP response times using curl
4. **Outbound Connection Monitor** (`snat_connection_monitoring.sh`): Analyzes netstat output for SNAT patterns

## Technology Stack

- **Shell Scripting** (Bash): Core automation logic
- **.NET Core Diagnostic Tools**: dotnet-counters, dotnet-dump, dotnet-trace
- **Azure Tools**: AzCopy for Blob Storage uploads
- **Linux Utilities**: curl, netstat, bc, awk, tr
- **Concurrency**: Background processes with lock file coordination

## Use Cases

- **Azure App Service Diagnostics**: First-line diagnostic tool for troubleshooting .NET Core web apps on Azure App Service Linux
- **Proactive Monitoring**: Detect and capture diagnostic data before complete service degradation
- **Performance Investigation**: Automated trace/dump collection triggered by performance thresholds
- **SNAT Exhaustion Detection**: Identify outbound connection issues common in cloud environments
- **Production Support**: SRE and DevOps teams managing .NET Core workloads on Azure

## Configuration Options

All monitoring thresholds and behaviors are configurable:

- Thread count threshold (default: 100 threads)
- HTTP response time threshold (default: 1000ms)
- Outbound connection threshold (default: 100 connections)
- Polling frequency (default: 10 seconds)
- Optional dump/trace collection modes

## Example Usage

```bash
# Interactive mode
./master_monitoring.sh

# Monitor thread counts with threshold 150 and enable both dump + trace
./master_monitoring.sh -d threadcount -t 150 enable-dump-trace

# Monitor response time for specific URL
./master_monitoring.sh -d responsetime -t 2000 -l http://myapp:8080/health enable-trace

# Stop all monitoring
./master_monitoring.sh -c
```

## Results & Impact

- **Reduced MTTR**: Automatic diagnostic collection eliminates manual intervention during incidents
- **Azure-Optimized**: Seamless integration with Azure App Service environment variables and Blob Storage
- **Enterprise-Ready**: Multi-instance awareness, retry logic, and proper resource cleanup
- **Zero-Touch Diagnostics**: Runs continuously in background, triggering collection only when needed

---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3">
        <a href="https://github.com/mainulhossain123/master_monitoring" class="btn btn-primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
        </a>
    </div>
</div>
